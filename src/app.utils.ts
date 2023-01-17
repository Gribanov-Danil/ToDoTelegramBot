export const getTaskList = (todos) =>
  `Ваш список дел: \n${todos
    .map((action) => (action.isCompleted ? "✅" : "❌") + action.name + "\n")
    .join("")}`
