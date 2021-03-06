import { createSlice, PayloadAction, configureStore } from "redux-starter-kit";

/* BEGIN REDUCER */
interface TodoModel {
  name: string;
}

const initialState = {
  todos: [] as TodoModel[]
};

const slice = createSlice({
  slice: "todo",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<TodoModel>): void {
      state.todos.push({ name: action.payload.name });
    }
  }
});
/* END REDUCER */

/* BEGIN CREATE STORE */
const store = configureStore({
  reducer: {
    todo: slice.reducer
  }
});
/* END CREATE STORE */

/* RUN */
store.dispatch(slice.actions.addTodo({ name: "Sample w/ explicit actions" }));
store.dispatch(slice.actions.addTodo({ name: "Sample w/ implicit actions" }));
store.dispatch(slice.actions.addTodo({ name: "Code Golf" }));

const state = store.getState();

state.todo.todos.forEach((todo, i) => console.log(`${i + 1}. ${todo.name}`));
