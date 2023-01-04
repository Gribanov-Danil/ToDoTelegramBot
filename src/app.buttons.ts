import { Markup } from "telegraf"

export const toDoList = "📔 Список дел"
export const editingTask = "✏ Редактирование"
export const markCompletion = "✅ Отметить выполнение"
export const deleteTask = "❌ Удаление"
export function actionButtons() {
  return Markup.keyboard(
    [
      Markup.button.callback("📔 Список дел", "list"),
      Markup.button.callback("✏ Редактирование", "edit"),
      Markup.button.callback("✅ Отметить выполнение", "done"),
      Markup.button.callback("❌ Удаление", "delete"),
    ],
    {
      columns: 2,
    },
  )
}
