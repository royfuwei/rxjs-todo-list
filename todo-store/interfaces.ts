export enum TodoActionTypes {
  LoadTodoItems,
  AddTodoItem,
  ToggleTodoItem,
}

export interface ITodoAction {
  type: TodoActionTypes;
  payload?: any;
}

export interface ITodoListState {
  loading: boolean;
  todos: ITodoItem[];
}

export interface ITodoItem {
  id: number;
  name: string;
  done: boolean;
}
