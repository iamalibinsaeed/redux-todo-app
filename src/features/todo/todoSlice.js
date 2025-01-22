import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [], // Initial state
  todoToEdit: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
        completed: false, // Add completed property (default to false)
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
      }
      state.todoToEdit = null;
    },
    setTodoToEdit: (state, action) => {
      state.todoToEdit = action.payload;
    },
    toggleTodoCompletion: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed; // Toggle the completed status
      }
    },
  },
});

export const {
  addTodo,
  removeTodo,
  editTodo,
  setTodoToEdit,
  toggleTodoCompletion,
} = todoSlice.actions;

export default todoSlice.reducer;
