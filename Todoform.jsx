import React from "react";
import { useTodo } from "../contexts/Todocontext";

function TodoForm() {
  const [todo, setTodo] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [priority, setPriority] = React.useState("");

  const { addTodo } = useTodo();

  const isDarkMode = document.documentElement.classList.contains("dark");

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;

    addTodo({
      todo,
      completed: false,
      dueDate,
      priority,
    });

    setTodo("");
    setDueDate("");
    setPriority("");
  };

  return (
    <form
      onSubmit={add}
      className="flex flex-col sm:flex-row gap-3 w-full items-center bg-white/5 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/10"
    >
      <input
        type="text"
        placeholder="✍️ Write your next task..."
        className={`w-full sm:flex-1 rounded-xl px-5 py-3 transition duration-300 shadow-inner backdrop-blur-sm focus:outline-none focus:ring-2
          ${isDarkMode
            ? 'bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:ring-violet-400'
            : 'bg-white text-gray-800 placeholder:text-gray-500 border border-[#c084fc] focus:ring-[#a855f7]'}
        `}
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      {/* ✅ Due Date input */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="px-4 py-3 rounded-xl border shadow-sm w-full sm:w-auto text-black"
      />

      {/* ✅ Priority dropdown */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="px-4 py-3 rounded-xl border shadow-sm w-full sm:w-auto text-black"
      >
        <option value="">Priority</option>
        <option value="High">🔥 High</option>
        <option value="Medium">⚡ Medium</option>
        <option value="Low">🧊 Low</option>
      </select>

      <button
        type="submit"
        className="bg-gradient-to-tr from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 active:scale-95 transition-all px-6 py-3 rounded-xl text-white font-bold shadow-lg hover:shadow-2xl w-full sm:w-auto"
      >
        ➕ Add
      </button>
    </form>
  );
}

export default TodoForm;
