import type { Todo, TodoAction } from '../types/todo'

export function todoReducer(todos: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'add':
      return [...todos, action.todo]
    case 'toggle':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo,
      )
    case 'edit': {
      const text = action.text.trim()
      // Guardar un texto vacío equivale a eliminar la tarea (como en TodoMVC)
      if (!text) return todos.filter((todo) => todo.id !== action.id)
      return todos.map((todo) => (todo.id === action.id ? { ...todo, text } : todo))
    }
    case 'delete':
      return todos.filter((todo) => todo.id !== action.id)
    case 'clearCompleted':
      return todos.filter((todo) => !todo.completed)
  }
}
