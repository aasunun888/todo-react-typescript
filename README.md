# Tareas · React + TypeScript

Lista de tareas (To-Do) hecha con React 19, TypeScript en modo estricto y Vite, sin librerías externas de estado ni de UI.

**Funcionalidades:** añadir, completar, editar (doble clic o botón; Enter guarda, Escape cancela), eliminar, filtrar (Todas / Pendientes / Completadas), contador de pendientes, borrar completadas y persistencia en `localStorage`. Es accesible con teclado y lector de pantalla, se adapta a móvil y tiene modo oscuro automático.

## Instalación y uso

Requiere Node.js 20.19 o superior.

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # comprueba tipos y genera dist/
npm run preview   # sirve la build de producción
npm run lint      # ESLint
```

## Estructura

```
src/
├── components/   # Solo presentación: reciben datos y emiten eventos
│   ├── TodoForm.tsx · TodoList.tsx · TodoItem.tsx · TodoItemEditor.tsx
│   └── TodoFilters.tsx · TodoFooter.tsx
├── hooks/
│   ├── useTodos.ts         # Toda la lógica de tareas
│   └── useLocalStorage.ts  # Persistencia genérica <T>
├── reducers/
│   └── todoReducer.ts      # Función pura (estado, acción) => estado
├── types/
│   └── todo.ts             # Todo, Filter y acciones del reducer
└── App.tsx                 # Solo compone componentes
```

## Decisiones técnicas

### Hooks personalizados
- **`useTodos`** concentra toda la lógica: estado, filtrado, contador y acciones. Los componentes no saben cómo se guardan ni se modifican las tareas, y `App.tsx` solo los conecta.
- **`useLocalStorage<T>`** persiste cualquier valor serializable y es reutilizable. No guarda estado propio: así no se duplica el estado de `useReducer` ni hace falta sincronizar dos fuentes de verdad. La lectura inicial (`readLocalStorage`) y la escritura van dentro de un `try/catch`. Si el JSON está corrupto, no hay acceso al storage o se excede la cuota, la app sigue funcionando en memoria.

### `useReducer` con acciones tipadas
- Las acciones son una **unión discriminada** (`add | toggle | edit | delete | clearCompleted`). TypeScript comprueba que cada acción lleve sus datos y que el `switch` las cubra todas.
- El reducer está en su propio archivo y es **puro**. El `id` (`crypto.randomUUID()`) y la fecha se generan en `useTodos` antes de despachar la acción. Así el reducer se puede probar sin React y se comporta igual aunque `StrictMode` lo ejecute dos veces.
- El estado inicial se lee de forma diferida (`useReducer(reducer, [], init)`), así que `localStorage` solo se lee una vez.

### Memoización
Se hace de forma explícita y sin React Compiler, para que cada optimización sea visible y se pueda justificar:
- **`React.memo` en `TodoItem`:** al marcar o editar una tarea, solo se vuelve a renderizar esa tarea y no toda la lista. Funciona porque el reducer conserva la referencia de las tareas que no cambian.
- **`useCallback`** en todos los handlers que llegan a `TodoItem`. Sin referencias estables, `memo` no serviría de nada. Como `dispatch` es estable, los handlers no tienen dependencias.
- **`useMemo`** para la lista filtrada y el contador de pendientes. Solo se recalculan cuando cambian las tareas o el filtro.
- Las `key` de la lista son el `id` de cada tarea, nunca el índice. Así React conserva el nodo y el estado de cada fila al filtrar o borrar.

### Accesibilidad
- HTML semántico: `<form>`, `<ul>/<li>`, `<button>` y un `<label>` para cada input. Las etiquetas que no se ven en pantalla usan `.sr-only`.
- Los botones de icono tienen `aria-label`, los filtros usan `aria-pressed`, el contador es una región `aria-live` y el error del formulario usa `role="alert"`.
- Al guardar o cancelar una edición con el teclado, el foco vuelve al botón de editar.
