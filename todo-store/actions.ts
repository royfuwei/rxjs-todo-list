import { ITodoAction, TodoActionTypes } from './interfaces';

export const loadTodoItemsAction = (): ITodoAction => {
  return {
    type: TodoActionTypes.LoadTodoItems,
    payload: null,
  };
};

export const addTodoItemAction = (payload: any): ITodoAction => {
  return {
    type: TodoActionTypes.AddTodoItem,
    payload,
  };
};

export const toggleTodoItemAction = (payload: any): ITodoAction => {
  return {
    type: TodoActionTypes.ToggleTodoItem,
    payload,
  };
};
