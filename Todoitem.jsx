import React, { useState } from "react";
import { useTodo } from "../contexts/Todocontext"; // ✅ Custom hook to access todo functions from context

function TodoItem({ todo }) {
  // ✅ Track whether the todo is in editable mode or not
  const [isTodoEditable, setIsTodoEditable] = useState(false);

  // ✅ Local state for editable text input (controlled component)
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  // ✅ Destructure methods from context
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  // ✅ Update the todo message and exit edit mode
  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg }); // spread operator to update object
    setIsTodoEditable(false); // exit edit mode
  };

  // ✅ Toggle complete/incomplete state
  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    // ✅ Todo item wrapper with conditional background color based on completed state
    <div
      className={`flex items-center border rounded-xl px-4 py-4 gap-4 shadow-xl transition-all duration-300
        backdrop-blur-md border-white/10
        ${
          todo.completed
            ? "bg-gradient-to-r from-emerald-200/30 to-green-100/20"
            : "bg-gradient-to-r from-purple-300/20 to-pink-200/10"
        }`}
    >
      {/* ✅ Checkbox to mark todo as completed */}
      <input
        type="checkbox"
        className="cursor-pointer w-5 h-5 accent-green-600 scale-110 hover:scale-125 transition-transform duration-200"
        checked={todo.completed}
        onChange={toggleCompleted}
      />

      {/* ✅ Input field to edit todo message */}
      <input
        type="text"
        className={`flex-grow rounded-lg px-3 py-2 outline-none bg-transparent border transition-all duration-300
          ${
            isTodoEditable
              ? "border-white/40 bg-white/60 text-black shadow-inner backdrop-blur"
              : "border-transparent"
          }
          ${
            todo.completed
              ? "line-through text-gray-500 italic"
              : "text-gray-900 font-semibold"
          }`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)} // ✅ Controlled input
        readOnly={!isTodoEditable} // ✅ Editable only when in edit mode
      />

      {/* ✅ Edit/Save button */}
      <button
        className={`w-9 h-9 flex items-center justify-center text-lg rounded-md 
          transition duration-300 font-bold text-white shadow-md
          ${
            todo.completed
              ? "bg-gray-400 cursor-not-allowed opacity-50"
              : "bg-blue-500 hover:bg-blue-600 active:scale-95"
          }`}
        onClick={() => {
          if (todo.completed) return; // ✅ Don't allow editing if todo is completed
          if (isTodoEditable) {
            editTodo(); // ✅ Save edit
          } else {
            setIsTodoEditable((prev) => !prev); // ✅ Enter edit mode
          }
        }}
        disabled={todo.completed}
        title={isTodoEditable ? "Save Todo" : "Edit Todo"}
      >
        {isTodoEditable ? "💾" : "✏️"}
      </button>

      {/* ✅ Delete button */}
      <button
        className="w-9 h-9 flex items-center justify-center text-lg rounded-md bg-red-500 hover:bg-red-600 active:scale-95 text-white shadow-md transition"
        onClick={() => deleteTodo(todo.id)} // ✅ Call delete function with ID
        title="Delete Todo"
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
