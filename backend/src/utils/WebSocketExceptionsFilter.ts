import { ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { BaseWsExceptionFilter, WsException } from "@nestjs/websockets";



@Catch()
export class WebsocketExceptionsFilter extends BaseWsExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const socket = host.switchToWs().getClient();
    const wsException = new WsException(exception.message);
    const response = {
      event: "error",
      data: {
        id: (socket as any).id,
        rid: (socket as any).rid,
        message: wsException.message,
        // @ts-ignore
        statusCode: exception?.status || 500
      }
    }

    console.log(response);

    socket.emit(response);
  }
}
