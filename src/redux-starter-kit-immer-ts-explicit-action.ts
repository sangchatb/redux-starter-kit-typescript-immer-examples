import { createStore, combineReducers, Action as ReduxAction } from "redux";
import { createAction, createReducer } from "redux-starter-kit";

/* BEGIN EXPLICIT ACTIONS */
interface TodoModel {
  name: string;
}

interface AddTodoPayload {
  name: string;
}

interface Action<TPayload> extends ReduxAction {
  payload: TPayload;
}

const actions = {
  addTodo: createAction<AddTodoPayload>("ADD_TODO")
};
/* END EXPLICIT ACTIONS */

/* BEGIN REDUCER */
const initialState = {
  todos: [] as TodoModel[]
};

const todoReducer = createReducer(initialState, {
  [actions.addTodo.type]: (draft, action: Action<AddTodoPayload>) => {
    draft.todos.push(action.payload);
  }
});
/* END REDUCER */

/* BEGIN CREATE STORE */
const reducers = combineReducers({
  todo: todoReducer
});

const store = createStore(reducers);
/* END CREATE STORE */

/* RUN */
store.dispatch(actions.addTodo({ name: "Sample w/ explicit actions" }));
store.dispatch(actions.addTodo({ name: "Sample w/ implicit actions" }));
store.dispatch(actions.addTodo({ name: "Code Golf" }));

const state = store.getState();

state.todo.todos.forEach((todo, i) => console.log(`${i + 1}. ${todo.name}`));
