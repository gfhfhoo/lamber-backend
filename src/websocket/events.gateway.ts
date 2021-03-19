import {
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Injectable, Logger } from "@nestjs/common";
import { Server, Socket } from "socket.io";

@Injectable()
@WebSocketGateway(2333, { transports: ["websocket"] })
export class EventsGateway implements OnGatewayInit, OnGatewayConnection {

  @WebSocketServer() wss: Server;

  private client = [];
  private logger: Logger = new Logger("EventsGateway");

  handleConnection(client: any) {
    this.client.push(client);
  }

  afterInit(server: any): any {
    this.logger.log("Websocket server initialized.");
  }

  @SubscribeMessage("message")
  handleEvent(client: Socket, data: string): string {
    console.log(data);
    return data;
  }

  broadcastMessage(data: string, event: string = "message") {
    this.wss.emit(event, data);
  }
}

