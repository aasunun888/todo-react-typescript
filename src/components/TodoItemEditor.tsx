import { useRef, useState, type KeyboardEvent } from 'react'

interface TodoItemEditorProps {
  id: string
  initialText: string
  onSave: (text: string) => void
  onCancel: () => void
}

function TodoItemEditor({ id, initialText, onSave, onCancel }: TodoItemEditorProps) {
  const [draft, setDraft] = useState(initialText)
  // Evita guardar dos veces: Enter/Escape cierran el editor y eso puede disparar onBlur
  const closed = useRef(false)

  const close = (action: () => void) => {
    if (closed.current) return
    closed.current = true
    action()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' && event.key !== 'Escape') return
    // Sin esto, el Enter llega al botón de editar (que recibe el foco al cerrar) y lo reabre
    event.preventDefault()
    close(event.key === 'Enter' ? () => onSave(draft) : onCancel)
  }

  const inputId = `edit-${id}`

  return (
    <>
      <label htmlFor={inputId} className="sr-only">
        Editar tarea
      </label>
      <input
        id={inputId}
        className="todo-item__edit"
        type="text"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => close(() => onSave(draft))}
        autoFocus
      />
    </>
  )
}

export default TodoItemEditor
