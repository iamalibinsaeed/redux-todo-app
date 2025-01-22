import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeTodo,
  setTodoToEdit,
  toggleTodoCompletion,
} from "../features/todo/todoSlice";

function Todos() {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const handleEditTodo = (todo) => {
    if (!todo.completed) {
      // Only allow editing if not completed
      dispatch(setTodoToEdit(todo)); // Set the todo being edited
    }
  };

  const handleToggleCompletion = (todoId) => {
    dispatch(toggleTodoCompletion(todoId)); // Toggle the completed state
  };

  return (
    <div>
      <div>Todos</div>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className={`mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded ${
              todo.completed ? "bg-gray-300" : ""
            }`}
            key={todo.id}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleCompletion(todo.id)}
                className="mr-2 text-white"
              />
              <span
                className={todo.completed ? "line-through text-black-700" : ""}
              >
                {todo.text}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditTodo(todo)} // Set the selected todo for editing
                className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
                disabled={todo.completed} // Disable the button if the todo is completed
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(removeTodo(todo.id))} // Remove the selected todo
                className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
