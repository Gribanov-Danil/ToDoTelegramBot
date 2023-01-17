import { AppService } from "./app.service"
import { Ctx, Hears, InjectBot, Message, On, Start, Update } from "nestjs-telegraf"
import { Telegraf } from "telegraf"
import {
  actionButtons,
  createTask,
  deleteTask,
  editingTask,
  markCompletion,
  toDoList,
} from "./app.buttons"
import { Context } from "./context.interface"
import { getTaskList } from "./app.utils"

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

  @Hears(createTask)
  async createTask(context: Context) {
    context.session.type = "create"
    await context.reply("Что нужно сделать?")
  }

  @Hears(toDoList)
  async getToDoList(context: Context) {
    const todos = await this.appService.getAll()
    await context.reply(getTaskList(todos))
  }

  @Hears(markCompletion)
  async setDoneTask(context: Context) {
    await context.reply("Напишите ID задачи: ")
    context.session.type = "done"
  }
  @Hears(editingTask)
  async editTask(context: Context) {
    await context.deleteMessage()
    await context.replyWithHTML(
      "Напишите ID задачи и её новое название:\n" + "В формате '<b>1 | Новое название</b>'",
    )
    context.session.type = "edit"
  }
  @Hears(deleteTask)
  async deleteTask(context: Context) {
    await context.reply("Напишите ID задачи: ")
    context.session.type = "remove"
  }

  @On("text")
  async getMessage(@Message("text") message: string, @Ctx() context: Context) {
    if (!context.session.type) return
    if (context.session.type === "create") {
      const toDoResponse = await this.appService.createTask(message)
      await context.reply(getTaskList(toDoResponse))
    }
    if (context.session.type === "done") {
      const toDoResponse = await this.appService.doneTask(Number(message))
      if (!toDoResponse) {
        await context.deleteMessage()
        await context.reply("Данная задача не найдена.\nПроверьте корректность введенного ID")
        return
      }
      await context.reply(getTaskList(toDoResponse))
    }
    if (context.session.type === "edit") {
      const [taskId, taskName] = message.split(" | ")
      const toDoResponse = await this.appService.editTask(Number(taskId), taskName)
      if (!toDoResponse) {
        await context.deleteMessage()
        await context.reply("Данная задача не найдена.\nПроверьте корректность введенного ID")
        return
      }
      await context.reply(getTaskList(toDoResponse))
    }
    if (context.session.type === "remove") {
      const toDoResponse = await this.appService.deleteTask(Number(message))
      if (!toDoResponse) {
        await context.deleteMessage()
        await context.reply("Данная задача не найдена.\nПроверьте корректность введенного ID")
        return
      }
      await context.reply(getTaskList(toDoResponse))
    }
  }
}
