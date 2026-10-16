export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

export type Filter = 'all' | 'pending' | 'completed'

export type TodoAction =
  | { type: 'add'; todo: Todo }
  | { type: 'toggle'; id: string }
  | { type: 'edit'; id: string; text: string }
  | { type: 'delete'; id: string }
  | { type: 'clearCompleted' }
