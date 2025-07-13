import React, { useState } from "react";
import { useTodo } from "../contexts/Todocontext";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center border rounded-xl px-4 py-4 gap-3 sm:gap-4 shadow-xl transition-all duration-300
        backdrop-blur-md border-white/10
        ${
          todo.completed
            ? "bg-gradient-to-r from-emerald-200/30 to-green-100/20"
            : "bg-gradient-to-r from-purple-300/20 to-pink-200/10"
        }`}
    >
      <div className="flex items-center w-full gap-3">
        <input
          type="checkbox"
          className="cursor-pointer w-5 h-5 accent-green-600 scale-110 hover:scale-125 transition-transform duration-200"
          checked={todo.completed}
          onChange={toggleCompleted}
        />

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
                ? "line-through text-white/80 italic"
                : "text-gray-900 font-semibold dark:text-white"
            }`}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          readOnly={!isTodoEditable}
        />

        <button
          className={`w-9 h-9 flex items-center justify-center text-lg rounded-md 
            transition duration-300 font-bold text-white shadow-md
            ${
              todo.completed
                ? "bg-gray-400 cursor-not-allowed opacity-50"
                : "bg-blue-500 hover:bg-blue-600 active:scale-95"
            }`}
          onClick={() => {
            if (todo.completed) return;
            if (isTodoEditable) {
              editTodo();
            } else {
              setIsTodoEditable((prev) => !prev);
            }
          }}
          disabled={todo.completed}
          title={isTodoEditable ? "Save Todo" : "Edit Todo"}
        >
          {isTodoEditable ? "💾" : "✏️"}
        </button>

        <button
          className="w-9 h-9 flex items-center justify-center text-lg rounded-md bg-red-500 hover:bg-red-600 active:scale-95 text-white shadow-md transition"
          onClick={() => deleteTodo(todo.id)}
          title="Delete Todo"
        >
          ❌
        </button>
      </div>

      {/* ✅ Priority and Due Date section */}
      <div className="flex justify-between sm:justify-start gap-6 px-1 sm:pl-8 text-sm text-black font-medium">
        {todo.priority && (
          <div className="flex items-center gap-1">
            <span className="font-semibold">Priority:</span>
            <span
              className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                todo.priority === "High"
                  ? "bg-red-600"
                  : todo.priority === "Medium"
                  ? "bg-yellow-500"
                  : "bg-blue-500"
              }`}
            >
              {todo.priority}
            </span>
          </div>
        )}
        {todo.dueDate && (
          <div className="flex items-center gap-1">
            <span className="font-semibold">Due:</span>
            <span>{todo.dueDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
