import { memo, useEffect, useRef, useState } from 'react'
import type { Todo } from '../types/todo'
import TodoItemEditor from './TodoItemEditor'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
  onDelete: (id: string) => void
}

function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const editButtonRef = useRef<HTMLButtonElement>(null)
  const wasEditing = useRef(false)

  // Al cerrar el editor con el teclado el foco se pierde: lo devolvemos al botón de editar
  useEffect(() => {
    if (wasEditing.current && !isEditing && document.activeElement === document.body) {
      editButtonRef.current?.focus()
    }
    wasEditing.current = isEditing
  }, [isEditing])

  const handleSave = (text: string) => {
    onEdit(todo.id, text)
    setIsEditing(false)
  }

  const checkboxId = `toggle-${todo.id}`
  const itemClass = `todo-item${todo.completed ? ' todo-item--completed' : ''}`

  if (isEditing) {
    return (
      <li className={`${itemClass} todo-item--editing`}>
        <TodoItemEditor
          id={todo.id}
          initialText={todo.text}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      </li>
    )
  }

  return (
    <li className={itemClass}>
      <input
        id={checkboxId}
        className="todo-item__toggle"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <label htmlFor={checkboxId} className="sr-only">
        Marcar «{todo.text}» como {todo.completed ? 'pendiente' : 'completada'}
      </label>
      <span className="todo-item__text" onDoubleClick={() => setIsEditing(true)}>
        {todo.text}
      </span>
      <button
        ref={editButtonRef}
        type="button"
        className="icon-button"
        onClick={() => setIsEditing(true)}
        aria-label={`Editar «${todo.text}»`}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4" />
        </svg>
      </button>
      <button
        type="button"
        className="icon-button icon-button--danger"
        onClick={() => onDelete(todo.id)}
        aria-label={`Eliminar «${todo.text}»`}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </li>
  )
}

export default memo(TodoItem)
