import { useState, type FormEvent } from 'react'

interface TodoFormProps {
  onAdd: (text: string) => void
}

function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!text.trim()) {
      setError('Escribe una tarea antes de añadirla.')
      return
    }
    onAdd(text)
    setText('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="new-todo" className="sr-only">
        Nueva tarea
      </label>
      <input
        id="new-todo"
        className="todo-form__input"
        type="text"
        placeholder="¿Qué tienes que hacer?"
        autoComplete="off"
        value={text}
        onChange={(event) => {
          setText(event.target.value)
          if (error) setError('')
        }}
        aria-invalid={error !== ''}
        aria-describedby={error ? 'new-todo-error' : undefined}
      />
      <button type="submit" className="button button--primary">
        Añadir
      </button>
      {error && (
        <p id="new-todo-error" className="todo-form__error" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}

export default TodoForm
