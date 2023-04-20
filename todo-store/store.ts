import { BehaviorSubject, from,} from 'rxjs';
import { ITodoAction, ITodoListState } from './interfaces';
import { todoReducer } from './reducer';

export class TodoStore {
  private _store$: BehaviorSubject<ITodoListState>;

  get store$() {
    return this._store$.asObservable();
  }

  constructor() {
    this._store$ = new BehaviorSubject<ITodoListState>({
      loading: false,
      todos: [],
    });
  }

  todoDispatcher(action: ITodoAction) {
    from(todoReducer(this._store$.value, action)).subscribe({
      next: (data) => this._store$.next(data),
      error: (data) => this._store$.error(data),
    });
  }
}