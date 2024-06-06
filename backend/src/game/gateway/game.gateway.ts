import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { GameService } from "../services/game.service";
import { UseFilters } from "@nestjs/common";
import { WsCatchAllFilter } from "src/utils/WebSocketExceptionsFilter";
import { Namespace } from 'socket.io';



@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
  cors: { origin: '*' }
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private gameService: GameService,

  ) {}
  // @ts-ignore
  @WebSocketServer() server: Namespace;

  async handleConnection(client: Socket) {
    const playerId = client.id;
    const username = client.handshake.auth.username;
    const gameId = client.handshake.auth.gameId;

    const hasGame = await this.gameService.hasGame(gameId);

    if (hasGame) {
      client.join(gameId);
      
      try {
        console.log('tentando adicionar jogador')
        await this.gameService.addPlayer({ id: playerId, gameId, name: username});
      }
      catch (error) {
        throw new WsException('Invalid credentials.');
      }

      client.emit('connected', {
        event: 'connected',
        data: {
          playerId 
        }
      });

      await this.gameService.subscribe((command: any) => {
        const { event, ...remaing } = command;

        console.log({event, data: remaing})

        this.server.to(gameId).emit(command.event, { data: remaing })
      }, gameId);

      client.on('startGame', async () => {  
        await this.gameService.startGame({ gameId });
      });

      client.on('guessSong', async ({ songGuessed, guessedAt}) => {
        await this.gameService.guessSong({ 
          playerId, 
          songGuessed, 
          gameId,
          guessedAt
        });
      });
      
      client.on('timedOut', async () => {
        await this.gameService.timedOut({ playerId, gameId });
      });

      client.on('gameConfig', async ({ speed, duration }) => {
        await this.gameService.setGameConfig({ speed, duration, gameId });
      });

      this.server.to(gameId).emit('players', {
        event: 'players',
        data : {
          players: await this.gameService.getPlayers({ gameId })
        }
      });
    } 
    else {
      client.disconnect();
    }
  }

  // ON DISCONNECT
  async handleDisconnect(client: Socket) {
    const playerId = client.id;
    const gameId = client.handshake.auth.gameId;

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