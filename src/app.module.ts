import { Module } from "@nestjs/common"
import { AppUpdate } from "./app.update"
import { AppService } from "./app.service"
import { TelegrafModule } from "nestjs-telegraf"
import * as LocalSession from "telegraf-session-local"
import { TypeOrmModule } from "@nestjs/typeorm"
import { join } from "path"

const sessions = new LocalSession({ database: "session_db.json" })
@Module({
  imports: [
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: "5720178480:AAFR6O5nWZMxBGUe-OvbXNWIp1EYXwBxEp0",
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5433,
      database: "todo-app-bot",
      username: "postgres",
      password: "",
      entities: [join(__dirname, "**", "*.entity.{ts,js}")],
      migrations: [join(__dirname, "**", "*.entity.{ts,js}")],
      synchronize: true,
    }),
  ],
  providers: [AppService, AppUpdate],
})
export class AppModule {}
