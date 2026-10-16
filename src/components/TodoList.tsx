import type { Filter, Todo } from '../types/todo'
import TodoItem from './TodoItem'

const EMPTY_MESSAGES: Record<Filter, string> = {
  all: 'No hay tareas',
  pending: 'No hay tareas pendientes',
  completed: 'No hay tareas completadas',
}

interface TodoListProps {
  todos: Todo[]
  filter: Filter
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
  onDelete: (id: string) => void
}

function TodoList({ todos, filter, onToggle, onEdit, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return <p className="todo-list__empty">{EMPTY_MESSAGES[filter]}</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TodoList
