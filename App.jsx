import { useState, useEffect } from 'react'; // ✅ React ke built-in hooks for state & lifecycle
import './App.css'; // ✅ Custom CSS file (agar kuch override karna ho Tailwind ke upar)
import { Todoprovider } from './contexts/Todocontext'; // ✅ Context API ka provider, global state pass karne ke liye
import TodoForm from './components/Todoform'; // ✅ Todo add karne ka form
import TodoItem from './components/Todoitem'; // ✅ Har ek individual todo item component
import { motion } from 'framer-motion'; // ✅ Animation ke liye
import darkBg from './assets/bg-dark.webp'; // ✅ Dark mode ke liye background image
import lightBg from './assets/bg-light-2.webp'; // ✅ Light mode ke liye background image

function App() {
  // ✅ React Hook: useState => Todos ka state rakha gaya hai as an array of objects
  const [todos, setTodos] = useState([]);

  // ✅ Theme mode ke liye state: dark ya light theme toggle karne ke liye
  const [isDarkMode, setIsDarkMode] = useState(true);

  // ✅ Add new todo (todo is an object with title & completed)
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  // ✅ Update an existing todo by matching its ID
  const updateTodo = (id, updatedTodo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? updatedTodo : prevTodo))
    );
  };

  // ✅ Delete todo by filtering it out
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // ✅ Toggle complete/incomplete state
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  // ✅ Component mount ke time localStorage se todos load karo
  useEffect(() => {
    const todosFromStorage = JSON.parse(localStorage.getItem('todos'));
    if (todosFromStorage && todosFromStorage.length > 0) {
      setTodos(todosFromStorage);
    }
  }, []);

  // ✅ Jab bhi todos change ho, localStorage mein update karo
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    // ✅ Context Provider ke through sab components ko state/functions mil jaayenge
    <Todoprovider
      value={{ todos, addTodo, updateTodo, toggleComplete, deleteTodo }}
    >
      {/* ✅ Outer shell with animated gradient + image background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: `url(${isDarkMode ? darkBg : lightBg})`, // ✅ Theme ke hisaab se background image change
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className={`relative min-h-screen flex items-center justify-center px-4 py-10 transition-colors duration-500 overflow-hidden
          ${isDarkMode
            ? 'bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]'
            : 'bg-gradient-to-br from-[#ffecd2] via-[#fcb69f] to-[#ff9a9e]'
          }`}
      >
        {/* ✅ Decorative overlay for texture/pattern (optional) */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>

        {/* ✅ Main container with glassmorphism effect and animated entry */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`relative w-full max-w-3xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.2)] p-8 transition-all
            ${isDarkMode
              ? 'bg-white/10 backdrop-blur-xl text-white border border-white/20'
              : 'bg-white/70 backdrop-blur-xl text-gray-900 border border-gray-200'
            }`}
        >
          {/* ✅ Header with title and theme toggle button */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
              📝 Manage Your Todos
            </h1>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)} // ✅ Theme toggle logic
              className={`text-sm px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-300
                ${
                  isDarkMode
                    ? 'bg-white/20 text-white hover:bg-white/30'
                    : 'bg-black/10 text-black hover:bg-black/20'
                }`}
            >
              {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>

          {/* ✅ Form component for adding new todos */}
          <div className="mb-6">
            <TodoForm />
          </div>

          {/* ✅ Todo list section with animation */}
          <motion.div
            layout
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {todos.length > 0 ? (
              // ✅ Agar todos available hain to unhe map karke TodoItem render karo
              todos.map((todo) => (
                <motion.div
                  key={todo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <TodoItem todo={todo} />
                </motion.div>
              ))
            ) : (
              // ✅ Agar koi todo nahi hai to empty state show karo
              <p className="text-center italic text-sm opacity-80">
                No todos yet. Add one above 👆
              </p>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </Todoprovider>
  );
}

export default App;
