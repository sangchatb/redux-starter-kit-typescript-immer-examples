import { createStore, combineReducers } from "redux";
import { createSlice, createAction, PayloadAction } from "redux-starter-kit";

/* BEGIN EXPLICIT ACTIONS */
const actions = {
  logout: createAction("LOGOUT")
};
/* END EXPLICIT ACTIONS */

/* BEGIN REDUCER */
interface TodoModel {
  name: string;
}

const initialState = {
  todos: [] as TodoModel[]
};

const slice = createSlice({
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<TodoModel>): void {
      state.todos.push({ name: action.payload.name });
    }
  },
  extraReducers: {
    [actions.logout.type]: function(): typeof initialState {
      return initialState;
    }
  }
});
/* END REDUCER */

/* BEGIN CREATE STORE */
const reducers = combineReducers({
  todo: slice.reducer
});

const store = createStore(reducers);
/* END CREATE STORE */

/* RUN */
store.dispatch(slice.actions.addTodo({ name: "Sample w/ explicit actions" }));
store.dispatch(slice.actions.addTodo({ name: "Sample w/ implicit actions" }));
store.dispatch(slice.actions.addTodo({ name: "Code Golf" }));

let state = store.getState();

const print = (): void => {
  console.log(`printing ${state.todo.todos.length} todos`);
  state.todo.todos.forEach((todo, i) => console.log(`${i + 1}. ${todo.name}`));
};

print();

store.dispatch(actions.logout());
state = store.getState();
print();
