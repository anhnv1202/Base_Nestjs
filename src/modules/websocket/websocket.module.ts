import { Module, Global } from '@nestjs/common';
import { WebSocketService } from './websocket.service';
import { SocketGateway } from './websocket.gateway';

@Global()
@Module({
  providers: [WebSocketService, SocketGateway],
  exports: [WebSocketService, SocketGateway],
})
export class SocketModule {}
