import { Module } from '@nestjs/common';
import { AppUpdate } from './app.update';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';

const sessions = new LocalSession({ database: 'session_db.json' });
@Module({
  imports: [
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: '5720178480:AAFR6O5nWZMxBGUe-OvbXNWIp1EYXwBxEp0',
    }),
  ],
  providers: [AppService, AppUpdate],
})
export class AppModule {}
