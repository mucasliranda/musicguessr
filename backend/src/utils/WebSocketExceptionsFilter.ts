import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, Injectable } from "@nestjs/common";
import { BaseWsExceptionFilter, WsException } from "@nestjs/websockets";

@Catch(WsException, HttpException)
export class WebsocketExceptionsFilter extends BaseWsExceptionFilter {
  catch(exception: WsException | HttpException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient() as WebSocket;
    const data = host.switchToWs().getData();
    const error = exception instanceof WsException ? exception.getError() : exception.getResponse();
    const details = error instanceof Object ? { ...error } : { message: error };

    console.log('chamou aqui')

    client.send(JSON.stringify({
      event: "error",
      data: {
        id: (client as any).id,
        rid: data.rid,
        ...details
      }
    }));
  }
}







@Catch()
export class WsCatchAllFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const socket = host.switchToWs().getClient();
    
    console.log('chamou aqui 2')

    if (exception instanceof BadRequestException) {
      const exceptionData = exception.getResponse() as any;

      console.log('chamou aqui 3')

      socket.emit({
        event: "error",
        data: {
          id: (socket as any).id,
          rid: exceptionData.rid,
          message: exceptionData.message,
          statusCode: exception.getStatus()
        }
      });
    }

    const weException = new WsException(exception.message);

    console.log('chamou aqui 4')

    socket.emit({
      event: "error",
      data: {
        id: (socket as any).id,
        rid: (socket as any).rid,
        message: weException.message,
        statusCode: 500
      }
    });
  }
}

