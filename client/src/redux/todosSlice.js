import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getTodoSuccess: (state, action) => {
      state.todos = [...state.todos, ...action.payload];
      state.loading = false;
      state.error = false;
    },
    fetchError: (state) => {
      state.loading = false;
      state.error = true;
    },
    addTodoSuccess: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },
    toggleComplete: (state, action) => {
      state.todos.map((todo) => {
        if (todo._id === action.payload.id) todo.completed = !todo.completed;
      });
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todo) => todo._id !== action.payload.id
      );
    },
  },
});

export default todosSlice.reducer;
export const {
  fetchStart,
  getTodoSuccess,
  fetchError,
  addTodoSuccess,
  toggleComplete,
  deleteTodo,
} = todosSlice.actions;
