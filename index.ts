import './style.css';
import * as domUtils from './dom-utils';
import { of, map, fromEvent } from 'rxjs';
import {
  addTodoItemAction,
  loadTodoItemsAction,
  TodoStore,
  toggleTodoItemAction,
} from './todo-store';

const todoListService = new TodoStore();
const store$ = todoListService.store$;

// Open the console in the bottom right to see results.
const initTodoItemEvents = () => {
  const toggleTodoItemElements = document.querySelectorAll(
    '#todoList input[type=checkbox]'
  );
  if (toggleTodoItemElements.length === 0) {
    return;
  }

  fromEvent(toggleTodoItemElements, 'click').subscribe((event: Event) => {
    // checkbox 點擊後，分配 toggleTodoItemAction
    todoListService.todoDispatcher(
      toggleTodoItemAction((event.target as HTMLInputElement).value)
    );
  });
};

// 初始化 TodoList 元件行為
// TodoList 元件同時有 Action 分配及訂閱 store$ 資料
const initTodoListComponent = () => {
  // 分配 loadTodoItemsAction，已取得 TodoItems 資料
  todoListService.todoDispatcher(loadTodoItemsAction());

  // 訂閱 store$ 來得到最新的 todos$ 資料
  store$.pipe(map((store) => store.todos)).subscribe((todos) => {
    domUtils.updateTodoList(todos);
    initTodoItemEvents();
  });
};

const initTodoInfoComponent = () => {
  const completedTodos$ = store$.pipe(
    map((data) => data.todos.filter((todo) => todo.done).length)
  );

  const totalTodos$ = store$.pipe(map((data) => data.todos.length));

  completedTodos$.subscribe((completedTodos) => {
    domUtils.updateCompleteTodos(completedTodos);
  });

  totalTodos$.subscribe((totalTodos) => {
    domUtils.updateTotalTodos(totalTodos);
  });
};

const initAddTodoItemComponent = () => {
  const addItemButtonElement = document.querySelector('#addTodoButton');
  fromEvent(addItemButtonElement, 'click').subscribe(() => {
    const todoItemElement = document.querySelector(
      '#todoDataText'
    ) as HTMLInputElement;
    const todoItemValue = todoItemElement.value;
    if (todoItemValue) {
      // 分配 addTodoItemAction 來新增 TodoItem
      todoListService.todoDispatcher(addTodoItemAction(todoItemValue));
    }
    todoItemElement.value = '';
    todoItemElement.focus();
  });
};

const initLoadingStateComponent = () => {
  const loading$ = store$.pipe(map((data) => data.loading));

  loading$.subscribe((loading) => {
    domUtils.updateLoadingState(loading);
  });
};

const initApp = () => {
  initAddTodoItemComponent();
  initTodoListComponent();
  initTodoInfoComponent();
  initLoadingStateComponent();
};
initApp();
