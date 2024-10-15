import { AuthModule } from '@modules/auth/auth.module';
import { CronJobModule } from '@modules/cron-job/cron-job.module';
import { SocketModule } from '@modules/websocket/websocket.module';
import { BullModule } from '@nestjs/bull';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { redisStore } from 'cache-manager-redis-store';
import { join } from 'path';
import { MongooseConfigService } from './config/mongo-config.service';
import { ThrottlerConfigService } from './config/throttler-config.service';
import { CacheModule as _CacheModule } from './modules/cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ThrottlerConfigService,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: (await redisStore({
          url: configService.get('REDIS_URL'),
        })) as unknown as CacheStore,
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        verifyOptions: {
          ignoreExpiration: false,
        },
        global: true,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        url: configService.get<string>('REDIS_URL'),
      }),
      inject: [ConfigService],
    }),
    SocketModule,
    AuthModule,
    _CacheModule,
    CronJobModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
