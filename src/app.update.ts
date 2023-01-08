import { AppService } from "./app.service"
import { Ctx, Hears, InjectBot, Message, On, Start, Update } from "nestjs-telegraf"
import { Telegraf } from "telegraf"
import { actionButtons, deleteTask, editingTask, markCompletion, toDoList } from "./app.buttons"
import { Context } from "./context.interface"
import { getTaskList } from "./app.utils"

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

  @Hears(toDoList)
  async getToDoList(context: Context) {
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
    if (context.session.type === "done") {
      const todo = todos.find((task) => task.id === Number(message))
      if (!todo) {
        await context.deleteMessage()
        await context.reply("Данная задача не найдена.\nПроверьте корректность введенного ID")
        return
      }
      todo.isCompleted = !todo.isCompleted
      await context.reply(getTaskList(todos))
    }
    if (context.session.type === "edit") {
      const [taskId, taskName] = message.split(" | ")
      const todo = todos.find((task) => task.id === Number(taskId))
      if (!todo) {
        await context.deleteMessage()
        await context.reply("Данная задача не найдена.\nПроверьте корректность введенного ID")
        return
      }
      todo.name = taskName
      await context.reply(getTaskList(todos))
    }
    if (context.session.type === "remove") {
      const todo = todos.find((task) => task.id === Number(message))
      if (!todo) {
        await context.deleteMessage()
        await context.reply("Данная задача не найдена.\nПроверьте корректность введенного ID")
        return
      }
      await context.reply(getTaskList(todos.filter((task) => task.id !== Number(message))))
    }
  }
}
