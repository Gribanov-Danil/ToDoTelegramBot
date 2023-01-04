import { AppService } from "./app.service"
import { InjectBot, Start, Update } from "nestjs-telegraf"
import { Context, Telegraf } from "telegraf"
import { actionButtons } from "./app.buttons"

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService,
  ) {}

  @Start()
  async startCommand(context: Context) {
    await context.reply("Привет, брат 🐺")
    await context.reply("Что хочешь сделать, брат?", actionButtons())
  }
}
