import {
  createAction,
  createReducer,
  PayloadAction,
  configureStore
} from "redux-starter-kit";

/* BEGIN EXPLICIT ACTIONS */
interface TodoModel {
  name: string;
}

interface AddTodoPayload {
  name: string;
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
  [actions.addTodo.type]: (draft, action: PayloadAction<AddTodoPayload>) => {
    draft.todos.push(action.payload);
  }
});
/* END REDUCER */

/* BEGIN CREATE STORE */
const store = configureStore({
  reducer: {
    todo: todoReducer
  }
});
/* END CREATE STORE */

/* RUN */
store.dispatch(actions.addTodo({ name: "Sample w/ explicit actions" }));
store.dispatch(actions.addTodo({ name: "Sample w/ implicit actions" }));
store.dispatch(actions.addTodo({ name: "Code Golf" }));

const state = store.getState();

state.todo.todos.forEach((todo, i) => console.log(`${i + 1}. ${todo.name}`));
