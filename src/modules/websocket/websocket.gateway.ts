/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IToken } from '@common/interfaces/auth.interface';
import { findKeyMap, handleLogError } from '@common/utils/helper.utils';
import { promiseHelper } from '@common/utils/promise.helper';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { verify } from 'jsonwebtoken';
import { Server, Socket } from 'socket.io';
import LogService from 'src/config/log.service';
import { SOCKET_SCREEN, SOCKET_SCREEN_ACTION } from './websocket.enum';
import { WebSocketService } from './websocket.service';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  constructor(private socketService: WebSocketService) {}

  private percentMap = new Map<string, number>();
  private uidMap = new Map<string, string>();

  @WebSocketServer() server: Server;
  wsClients = new Map<string, Socket>();

  afterInit(server: Server) {
    this.socketService.socketServer = server;
  }
  async handleConnection(client: Socket) {
    const { token } = client.handshake.auth;

    try {
      const userInfo = verify(token || '', process.env.JWT_SECRET_KEY || '') as IToken;
      if (!userInfo) {
        client.disconnect();
        return;
      }
      this.wsClients.set(userInfo.userId, client);
      LogService.logInfo(`[SOCKET] ${userInfo.userId} ${String(client.id)} `);
      this.uidMap.set(client?.id, `${userInfo.userId}-${userInfo.sessionId}`);
      this.percentMap.set(client?.id, 0);
    } catch (err) {
      // handleLogError(err);
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    LogService.logInfo('[SOCKET][DISCONNECT] ' + String(client.id));
    this.uidMap.delete(client.id);
    this.percentMap.delete(client.id);
    for (const [userId, socket] of this.wsClients.entries()) {
      if (socket.id === client.id) {
        this.wsClients.delete(userId);
        break;
      }
    }
  }

  private broadcast(event: string, message?: any) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.wsClients.forEach((socket, clientId) => {
        socket.emit(event, message);
      });
    } catch (e) {
      handleLogError(e);
      return null;
    }
  }

  emitToRoom<T>(room: string, event: string, payload: T) {
    this.server.to(room).emit(event, payload);
  }

  private broadcastClient(event: string, userId?: string, message?: string) {
    try {
      if (!this.wsClients.has(userId)) return null;
      this.wsClients.get(userId).emit(event, message);
    } catch (e) {
      handleLogError(e);
      return null;
    }
  }

  async sendPercent(userId: string, percent: number) {
    const key = findKeyMap(this.uidMap, userId);
    key && this.percentMap.set(key, percent);
    await promiseHelper.delay(100);
    this.emitToRoom(key, SOCKET_SCREEN.PROGRESS_WAITING, { payload: Object.fromEntries(this.percentMap.entries()) });
    await promiseHelper.delay(100);
    if (percent === 100) {
      this.percentMap.set(userId, 0);
    }
  }

  sendSocket(screen: SOCKET_SCREEN, action?: SOCKET_SCREEN_ACTION, payload?: any) {
    this.broadcast(screen, { action, payload });
  }
}
