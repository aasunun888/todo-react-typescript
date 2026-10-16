interface TodoFooterProps {
  pendingCount: number
  hasCompleted: boolean
  onClearCompleted: () => void
}

function TodoFooter({ pendingCount, hasCompleted, onClearCompleted }: TodoFooterProps) {
  return (
    <footer className="todo-footer">
      <p className="todo-footer__count" aria-live="polite">
        <strong>{pendingCount}</strong>{' '}
        {pendingCount === 1 ? 'tarea pendiente' : 'tareas pendientes'}
      </p>
      <button
        type="button"
        className="button button--ghost"
        onClick={onClearCompleted}
        disabled={!hasCompleted}
      >
        Borrar completadas
      </button>
    </footer>
  )
}

export default TodoFooter
