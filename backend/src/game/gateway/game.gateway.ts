import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { GameService } from "../services/game.service";

@WebSocketGateway({ cors: { origin: '*' } })
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private gameService: GameService,
  ) {}
  // @ts-ignore
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
  }

  // ON CONNECT
  async handleConnection(client: Socket) {
    const playerId = client.id;
    const username = client.handshake.auth.username;
    const gameId = client.handshake.auth.gameId;

    console.log({ playerId, username, gameId })

    console.log(`connected client id: ${client.id}`);

    client.join(gameId);
    
    await this.gameService.addPlayer({ id: playerId, gameId, name: username});

    await this.gameService.subscribe((command: any) => {
      const { event, ...remaing } = command;

      console.log({event, data: remaing})

      this.server.to(gameId).emit(command.event, { data: remaing })
    }, gameId);

    client.on('startGame', async () => {  
      await this.gameService.startGame({ gameId });
    });

    client.on('guessSong', async (songGuessed) => {
      await this.gameService.guessSong({ playerId, songGuessed, gameId });
    });
    
    client.on('timedOut', async () => {
      await this.gameService.timedOut({ playerId, gameId });
    })

    this.server.to(gameId).emit('players', {
      event: 'players',
      data : {
        players: await this.gameService.getPlayers({ gameId })
      }
    });
  } 

  // ON DISCONNECT
  async handleDisconnect(client: Socket) {
    const playerId = client.id;
    const gameId = client.handshake.auth.gameId;

    await this.gameService.removePlayer({ playerId, gameId });

    this.server.to(gameId).emit('players', {
      event: 'players',
      data : {
        players: await this.gameService.getPlayers({ gameId })
      }
    });
  }
}