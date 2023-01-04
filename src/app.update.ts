import { AppService } from "./app.service"
import { Hears, InjectBot, Start, Update } from "nestjs-telegraf"
import { Context, Telegraf } from "telegraf"
import { actionButtons } from "./app.buttons"

const todos = [
  {
    id: 1,
    name: "Помыть кота",
    isCompleted: false,
  },
  {
    id: 2,
    name: "Покушать",
    isCompleted: false,
  },
  {
    id: 3,
    name: "Поспать",
    isCompleted: true,
  },
]
@Update()
export class AppUpdate {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<Context>,
    private readonly appService: AppService,
  ) {}

  @Start()
  async startCommand(context: Context) {
    await context.reply("Привет, брат 🐺")
    await context.reply("Что хочешь сделать, брат?", actionButtons())
  }

  @Hears("📔 Список дел")
  async getAll(context: Context) {
    await context.reply(
      `Ваш список дел: \n${todos
        .map((action) => (action.isCompleted ? "✅" : "❌") + action.name + "\n")
        .join("")}`,
    )
  }
}
