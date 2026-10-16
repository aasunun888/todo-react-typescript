import type { Filter } from '../types/todo'

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: 'Pendientes' },
  { value: 'completed', label: 'Completadas' },
]

interface TodoFiltersProps {
  current: Filter
  onChange: (filter: Filter) => void
}

function TodoFilters({ current, onChange }: TodoFiltersProps) {
  return (
    <div className="todo-filters" role="group" aria-label="Filtrar tareas">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className="todo-filters__button"
          aria-pressed={current === value}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default TodoFilters
