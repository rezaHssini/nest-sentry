import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SentryModule, SentryService } from '@ntegral/nestjs-sentry';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GlobalServicesModule } from './global-module/global-services.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : '.env',
    }),
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          dsn: configService.get('SENTRY_DSN'),
          debug: configService.get('SENTRY_DEBUG') === 'true' ? true : false,
          environment: configService.get('SENTRY_ENVIRONMENT'),
          logLevel: configService.get('SENTRY_LOGLEVEL'),
          tracesSampleRate: +configService.get('SENTRY_TRACE_SAMPLE_RATE'),
        };
      },
      inject: [ConfigService],
    }),
    GlobalServicesModule.register([SentryService], []),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
