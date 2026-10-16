import { useEffect } from 'react'

/** Lee y parsea un valor de localStorage, devolviendo `fallback` si no existe o falla. */
export function readLocalStorage<T>(key: string, fallback: T): T {
  try {
    const stored = window.localStorage.getItem(key)
    return stored === null ? fallback : (JSON.parse(stored) as T)
  } catch (error) {
    // JSON corrupto o storage inaccesible (modo privado, permisos...)
    console.warn(`No se pudo leer "${key}" de localStorage:`, error)
    return fallback
  }
}

/**
 * Persiste `value` en localStorage cada vez que cambia.
 * No guarda estado propio: el estado lo gestiona quien lo usa (useState, useReducer...).
 */
export function useLocalStorage<T>(key: string, value: T): void {
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      // Cuota excedida o storage inaccesible: la app sigue funcionando en memoria
      console.warn(`No se pudo guardar "${key}" en localStorage:`, error)
    }
  }, [key, value])
}
