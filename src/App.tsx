import TodoFilters from './components/TodoFilters'
import TodoFooter from './components/TodoFooter'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { useTodos } from './hooks/useTodos'

function App() {
  const {
    todos,
    pendingCount,
    hasCompleted,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    clearCompleted,
  } = useTodos()

  return (
    <main className="app">
      <h1 className="app__title">Tareas</h1>
      <section className="card" aria-label="Lista de tareas">
        <TodoForm onAdd={addTodo} />
        <TodoFilters current={filter} onChange={setFilter} />
        <TodoList
          todos={todos}
          filter={filter}
          onToggle={toggleTodo}
          onEdit={editTodo}
          onDelete={deleteTodo}
        />
        <TodoFooter
          pendingCount={pendingCount}
          hasCompleted={hasCompleted}
          onClearCompleted={clearCompleted}
        />
      </section>
    </main>
  )
}

export default App
