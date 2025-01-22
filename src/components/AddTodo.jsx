import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo } from "../features/todo/todoSlice";

function AddTodo() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const todoToEdit = useSelector((state) => state.todo.todoToEdit); // Access todoToEdit from Redux state
  const dispatch = useDispatch();

  // Set input field value to todoToEdit text when it's being edited
  useEffect(() => {
    if (todoToEdit) {
      setInput(todoToEdit.text);
    } else {
      setInput("");
    }
  }, [todoToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the input is empty and set error message
    if (input.trim() === "") {
      setError("Please enter a todo.");
      return; // Prevent form submission if input is empty
    }

    // Reset error if input is valid
    setError("");

    if (todoToEdit) {
      dispatch(editTodo({ id: todoToEdit.id, text: input }));
    } else {
      dispatch(addTodo(input));
    }
    setInput(""); // Clear the input field after submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-x-3 mt-12">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        {todoToEdit ? "Edit Todo" : "Add Todo"}
      </button>

      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </form>
  );
}

export default AddTodo;
