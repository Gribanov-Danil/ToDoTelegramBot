import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectBot, Start, Update } from "nestjs-telegraf";
import { Context, Telegraf } from 'telegraf';

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService,
  ) {}

  @Start()
  async startCommand(context: Context) {
    await context.reply('Привет, брат 🐺');
  }
}
