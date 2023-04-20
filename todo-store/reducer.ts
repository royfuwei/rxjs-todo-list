import { concat, delay, Observable, of } from 'rxjs';
import { ITodoAction, ITodoListState, TodoActionTypes } from './interfaces';

export const todoReducer = (
  currentState: ITodoListState,
  action: ITodoAction
) => {
  const loadingState = { ...currentState, loading: true };
  const loadingState$ = of(loadingState);
  let newState$: Observable<ITodoListState>;
  switch (action.type) {
    case TodoActionTypes.LoadTodoItems: {
      const newState = Object.assign(currentState, {
        todos: [
          ...currentState.todos,
          { id: 1, name: 'Todo Item 1', done: false },
          { id: 2, name: 'Todo Item 2', done: true },
          { id: 3, name: 'Todo Item 3', done: false },
        ],
      });
      newState$ = of(newState).pipe(delay(1000));
      break;
    }
    case TodoActionTypes.AddTodoItem: {
      const newState: ITodoListState = Object.assign(currentState, {
        todos: [
          ...currentState.todos,
          {
            id: currentState.todos.length + 1,
            name: action.payload,
            done: false,
          },
        ],
        loading: false,
      });

      newState$ = of(newState).pipe(delay(500));
      break;
    }
    case TodoActionTypes.ToggleTodoItem: {
      const newState: ITodoListState = Object.assign(currentState, {
        todos: currentState.todos.map((todo) => {
          const done = +action.payload === todo.id ? !todo.done : todo.done;
          return Object.assign(todo, { done });
        }),
        loading: false,
      });
      newState$ = of(newState).pipe(delay(500));
      break;
    }
  }
  return concat(loadingState$, newState$);
};
