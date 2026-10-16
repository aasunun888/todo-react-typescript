import { useCallback, useMemo, useReducer, useState } from 'react'
import { todoReducer } from '../reducers/todoReducer'
import type { Filter, Todo } from '../types/todo'
import { readLocalStorage, useLocalStorage } from './useLocalStorage'

const STORAGE_KEY = 'todos'

export function useTodos() {
  const [todos, dispatch] = useReducer(todoReducer, [], () =>
    readLocalStorage<Todo[]>(STORAGE_KEY, []),
  )
  const [filter, setFilter] = useState<Filter>('all')

  useLocalStorage(STORAGE_KEY, todos)

  // El id y la fecha se generan aquí y no en el reducer, para que este sea puro
  const addTodo = useCallback((text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    dispatch({
      type: 'add',
      todo: { id: crypto.randomUUID(), text: trimmed, completed: false, createdAt: Date.now() },
    })
  }, [])

  const toggleTodo = useCallback((id: string) => dispatch({ type: 'toggle', id }), [])

  const editTodo = useCallback(
    (id: string, text: string) => dispatch({ type: 'edit', id, text }),
    [],
  )

  const deleteTodo = useCallback((id: string) => dispatch({ type: 'delete', id }), [])

  const clearCompleted = useCallback(() => dispatch({ type: 'clearCompleted' }), [])

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'pending':
        return todos.filter((todo) => !todo.completed)
      case 'completed':
        return todos.filter((todo) => todo.completed)
      case 'all':
        return todos
    }
  }, [todos, filter])

  const pendingCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos],
  )

  return {
    todos: filteredTodos,
    pendingCount,
    hasCompleted: pendingCount < todos.length,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    clearCompleted,
  }
}
