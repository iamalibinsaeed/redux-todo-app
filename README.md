
# Todo App with Redux Toolkit

This is a simple **Todo Application** built using **React** and **Redux Toolkit** for state management. The application allows you to:

- Add new todos
- Edit existing todos
- Mark todos as completed
- Remove todos

### Features:
- **Add Todo**: Add a new todo with a description.
- **Edit Todo**: Edit the text of an existing todo (only available for incomplete todos).
- **Toggle Completion**: Mark a todo as completed or incomplete using a checkbox.
- **Remove Todo**: Delete a todo from the list.
- **Persist State**: The app maintains the state even after a page refresh using `redux-persist`.

---

## Technologies Used

- **React**: Frontend JavaScript library for building UI.
- **Redux Toolkit**: A state management library for handling global state.
- **redux-persist**: To persist Redux state across page reloads.
- **React Hooks**: To manage component state and lifecycle methods.

---

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

Make sure you have **Node.js** and **npm** or **yarn** installed on your machine.

- [Node.js](https://nodejs.org/) (includes npm)
- [Yarn](https://yarnpkg.com/) (optional)

### Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/iamalibinsaeed/react-todo-hooks
```

2. Navigate to the project directory:

```bash
cd react-todo-hooks
```

3. Install the required dependencies:

If you're using npm:

```bash
npm install
```

Or with Yarn:

```bash
yarn install
```

4. Start the development server:

If you're using npm:

```bash
npm start
```

Or with Yarn:

```bash
yarn start
```

This will start the application on `http://localhost:3000`.

---

## Usage

Once the app is running, you will be able to:

1. **Add a Todo**:
   - Enter a todo in the input field and click the "Add Todo" button to add it to the list.
   
2. **Edit a Todo**:
   - Click the "Edit" button next to any incomplete todo to modify its text.
   - Completed todos cannot be edited.

3. **Toggle Completion**:
   - Use the checkbox next to each todo to mark it as completed or incomplete.
   - Completed todos will have a crossed-out style.

4. **Remove a Todo**:
   - Click the "Remove" button to delete a todo from the list.

---

## Redux Toolkit Slice (`todoSlice.js`)

This app uses Redux Toolkit for state management. The `todoSlice` manages the todos in the state and includes actions for adding, editing, removing, and toggling todos. Here is a summary of the reducer functions:

- **addTodo**: Adds a new todo to the state. The todo object has an `id`, `text`, and `completed` property.
- **removeTodo**: Removes a todo from the state by filtering it out using the `id`.
- **editTodo**: Updates the text of an existing todo. Only updates the `text` property.
- **setTodoToEdit**: Sets a todo to be edited, so the app can manage which todo is being edited.
- **toggleTodoCompletion**: Toggles the `completed` status of a todo.

Here is the full code for the `todoSlice.js`:

```javascript
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
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
        completed: false,
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
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, removeTodo, editTodo, setTodoToEdit, toggleTodoCompletion } = todoSlice.actions;

export default todoSlice.reducer;
```

---

## Contributing

Feel free to fork the repository, create a new branch, and submit pull requests with any improvements or bug fixes. Here are a few ideas to improve the app:

- Add a filter to show only completed or incomplete todos.
- Add a search functionality to filter todos by text.
- Implement user authentication to store todos for individual users.

---



