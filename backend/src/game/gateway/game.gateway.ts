import { ConnectedSocket, MessageBody, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { GameService } from "../services/game.service";
import { HttpException, NotFoundException, UseFilters } from "@nestjs/common";
import { WebsocketExceptionsFilter } from "src/utils/WebSocketExceptionsFilter";



@UseFilters(WebsocketExceptionsFilter)
@WebSocketGateway({
  cors: { origin: '*' }
})
export class GameGateway implements OnGatewayDisconnect {
  constructor(
    private gameService: GameService,
  ) {}
  @WebSocketServer()
  // @ts-ignore
  server: Socket;

  @SubscribeMessage('joinGame')
  async handleOnJoinGame(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    const playerId = client.id;
    const username = data.username;
    const gameId = data.gameId;

    client.handshake.auth.gameId = gameId;

    const hasGame = await this.gameService.hasGame(gameId);

    if (hasGame) {
      client.join(gameId);
      
      await this.gameService.addPlayer({ id: playerId, gameId, name: username});

      client.emit('gameJoined', {
        event: 'gameJoined',
        data: {
          playerId 
        }
      });

      await this.gameService.subscribe((command: any) => {
        const { event, ...remaing } = command;

        console.log({event, data: remaing})

        this.server.to(gameId).emit(command.event, { data: remaing })
      }, gameId);

      this.server.to(gameId).emit('players', {
        event: 'players',
        data : {
          players: await this.gameService.getPlayers({ gameId })
        }
      });
    }
    else {
      client.emit('gameNotFound');
    }
  }

  @SubscribeMessage('startGame')
  async handleOnStartGame(
    @ConnectedSocket() client: Socket,
  ) {
    const gameId = client.handshake.auth.gameId;

    await this.gameService.startGame({ gameId });
  }

  @SubscribeMessage('guessSong')
  async handleOnGuessSong(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    const playerId = client.id;
    const songGuessed = data.songGuessed;
    const guessedAt = data.guessedAt;
    const gameId = client.handshake.auth.gameId;

    await this.gameService.guessSong({ playerId, songGuessed, gameId, guessedAt });
  }

  @SubscribeMessage('timedOut')
  async handleOnTimedOut(
    @ConnectedSocket() client: Socket,
  ) {
    const playerId = client.id;
    const gameId = client.handshake.auth.gameId;

    await this.gameService.timedOut({ playerId, gameId });
  }

  @SubscribeMessage('gameConfig')
  async handleOnGameConfig(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: {
      roundDuration: number,
      songDuration: number,
      gameMode: string,
      value: number
    },
  ) {
    const gameId = client.handshake.auth.gameId;
    const { roundDuration, songDuration, gameMode, value } = data;

    await this.gameService.setGameConfig({ gameId, roundDuration, songDuration, gameMode, value });
  }

  // ON DISCONNECT
  async handleDisconnect(client: Socket) {
    const playerId = client.id;
    const gameId = client.handshake.auth.gameId;

    if (!gameId) return;

    const hasGame = await this.gameService.hasGame(gameId);

    if (hasGame) {
      await this.gameService.removePlayer({ playerId, gameId });

      this.server.to(gameId).emit('players', {
        event: 'players',
        data : {
          players: await this.gameService.getPlayers({ gameId })
        }
      });
    }
  }
}