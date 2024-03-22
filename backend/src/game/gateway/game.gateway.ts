import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { GameService } from "../services/game.service";

// nestjs websockets

@WebSocketGateway({ cors: { origin: '*' } })
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private gameService: GameService,
  ) {}



  @WebSocketServer() server: Server;

  // @SubscribeMessage('msg')
  // handleMessage(client: Socket, payload: string): void {
  //   console.log("GameGateway handleMessage", payload);
  //   console.log(`hanle message from ${client.id} with payload ${payload}`);
  // }



  afterInit(server: Server) {
    // console.log("GameGateway initialized");
  }

  // ON CONNECT
  handleConnection(client: Socket) {
    const playerId = client.id;

    console.log(`connected client id: ${client.id}`);

    this.gameService.addPlayer({ playerId });

    this.gameService.subscribe((command) => {
      // console.log(`> Emitting ${JSON.stringify(command)}`)

      const { event, ...remaing } = command;

      console.log({event, data: remaing})

      this.server.emit(command.event, { data: remaing })
    });

    client.on('startGame', () => {  
      this.gameService.startGame();
    });

    client.on('guessSong', (songGuessed) => {
      console.log(playerId, 'chutou: ')
      console.log(songGuessed)
      this.gameService.guessSong({ playerId, songGuessed });
    });
    

    this.server.emit('players', () => {
      this.server.send('players', {
        event: 'players',
        data : {
          players: this.gameService.getPlayers()
        }
      })
    });
  } 

  // ON DISCONNECT
  handleDisconnect(client: Socket) {
    const playerId = client.id;
    console.log(`disconnected client id: ${playerId}`);

    this.gameService.removePlayer({ playerId });

    this.server.emit('players', this.gameService.getPlayers());
  }
}