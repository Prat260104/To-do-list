import React from "react";
import { useTodo } from "../contexts/Todocontext"; // ✅ Custom hook to access global todo context

function TodoForm() {
  // ✅ Local component state: todo input field ka value yahan store hota hai
  const [todo, setTodo] = React.useState("");

  // ✅ Context se addTodo function access kiya (central state management)
  const { addTodo } = useTodo();

  // ✅ Theme mode ke liye body class se mode check kar lo
  const isDarkMode = document.documentElement.classList.contains("dark");

  // ✅ Form submit handler
  const add = (e) => {
    e.preventDefault(); // Form submit ke default page reload ko rokta hai
    if (!todo) return; // Empty todo submit na ho

    // ✅ Add new todo (as object with title and completed status)
    addTodo({ todo, completed: false });

    // ✅ After submit, input field clear kar do
    setTodo("");
  };

  return (
    // ✅ Form with flex layout (input + button side by side)
    <form
      onSubmit={add}
      className="flex w-full gap-3 items-center bg-white/5 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/10"
    >
      {/* ✅ Controlled input: value linked with React state */}
      <input
        type="text"
        placeholder="✍️ Write your next task..."
        className={`w-full rounded-xl px-5 py-3 transition duration-300 shadow-inner backdrop-blur-sm focus:outline-none focus:ring-2
          ${isDarkMode
            ? 'bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:ring-violet-400'
            : 'bg-white text-gray-800 placeholder:text-gray-500 border border-[#c084fc] focus:ring-[#a855f7]'}
        `}
        value={todo}
        onChange={(e) => setTodo(e.target.value)} // ✅ State update on every keystroke
      />

      {/* ✅ Submit button with transition, rounded and responsive */}
      <button
        type="submit"
        className="bg-gradient-to-tr from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 active:scale-95 transition-all px-6 py-3 rounded-xl text-white font-bold shadow-lg hover:shadow-2xl"
      >
        ➕ Add
      </button>
    </form>
  );
}

export default TodoForm;
