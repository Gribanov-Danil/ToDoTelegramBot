import { Markup } from "telegraf"
export function actionButtons() {
  return Markup.keyboard(
    [
      Markup.button.callback("📔 Список дел", "list"),
      Markup.button.callback("✏ Редактирование", "edit"),
      Markup.button.callback("❌ Удаление", "delete"),
    ],
    {
      columns: 3,
    },
  )
}
