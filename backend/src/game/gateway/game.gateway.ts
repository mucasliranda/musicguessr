import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { GameService } from "../services/game.service";

@WebSocketGateway({ cors: { origin: '*' } })
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private gameService: GameService,
  ) {}
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
  }

  // ON CONNECT
  handleConnection(client: Socket) {
    const playerId = client.id;
    const username = client.handshake.auth.username;
    const gameId = client.handshake.auth.gameId;

    console.log({ playerId, username, gameId })

    console.log(`connected client id: ${client.id}`);

    client.join(gameId);
    
    this.gameService.addPlayer({ playerId, gameId });

    this.gameService.subscribe((command) => {
      const { event, ...remaing } = command;

      console.log({event, data: remaing})

      this.server.to(gameId).emit(command.event, { data: remaing })
    }, gameId);

    client.on('startGame', () => {  
      this.gameService.startGame({ gameId });
    });

    client.on('guessSong', (songGuessed) => {
      this.gameService.guessSong({ playerId, songGuessed, gameId });
    });
    
    client.on('timedOut', () => {
      this.gameService.timedOut({ playerId, gameId });
    })

    this.server.to(gameId).emit('players', {
      event: 'players',
      data : {
        players: this.gameService.getPlayers({ gameId })
      }
    });
  } 

  // ON DISCONNECT
  handleDisconnect(client: Socket) {
    const playerId = client.id;
    const gameId = client.handshake.auth.gameId;

    this.gameService.removePlayer({ playerId, gameId });

    this.server.to(gameId).emit('players', {
      event: 'players',
      data : {
        players: this.gameService.getPlayers({ gameId })
      }
    });
  }
}