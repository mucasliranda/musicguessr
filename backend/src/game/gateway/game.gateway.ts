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

    this.gameService.addPlayer({ playerId });

    this.gameService.subscribe((command) => {
      const { event, ...remaing } = command;

      console.log({event, data: remaing})

      this.server.emit(command.event, { data: remaing })
    });

    client.on('startGame', () => {  
      this.gameService.startGame();
    });

    client.on('guessSong', (songGuessed) => {
      this.gameService.guessSong({ playerId, songGuessed });
    });
    
    client.on('timedOut', () => {
      this.gameService.timedOut({ playerId });
    })

    this.server.emit('players', {
      event: 'players',
      data : {
        players: this.gameService.getPlayers()
      }
    });
  } 

  // ON DISCONNECT
  handleDisconnect(client: Socket) {
    const playerId = client.id;

    this.gameService.removePlayer({ playerId });

    this.server.emit('players', {
      event: 'players',
      data : {
        players: this.gameService.getPlayers()
      }
    });
  }
}