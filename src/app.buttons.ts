import { Markup } from "telegraf"

export const createTask = "🔨 Создать задачу"
export const toDoList = "📔 Список дел"
export const editingTask = "✏ Редактирование"
export const markCompletion = "✅ Отметить выполнение"
export const deleteTask = "❌ Удаление"
export function actionButtons() {
  return Markup.keyboard(
    [
      Markup.button.callback(createTask, "create"),
      Markup.button.callback(toDoList, "list"),
      Markup.button.callback(editingTask, "edit"),
      Markup.button.callback(markCompletion, "done"),
      Markup.button.callback(deleteTask, "delete"),
    ],
    {
      columns: 2,
    },
  )
}
