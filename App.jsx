import { useState, useEffect } from 'react';
import './App.css';
import { Todoprovider } from './contexts/Todocontext';
import TodoForm from './components/Todoform';
import TodoItem from './components/Todoitem';
import { motion } from 'framer-motion';
import darkBg from './assets/bg-dark.webp';
import lightBg from './assets/bg-light-2.webp';

function App() {
  const [todos, setTodos] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [filter, setFilter] = useState("all"); // ✅ Added: filter state

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? updatedTodo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todosFromStorage = JSON.parse(localStorage.getItem('todos'));
    if (todosFromStorage && todosFromStorage.length > 0) {
      setTodos(todosFromStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // ✅ Filtered todos based on selected filter type
  const filteredTodos = todos.filter(todo => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <Todoprovider value={{ todos, addTodo, updateTodo, toggleComplete, deleteTodo }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: `url(${isDarkMode ? darkBg : lightBg})`,
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
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>

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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
              📝 Manage Your Todos
            </h1>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
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

          {/* ✅ Todo Form */}
          <div className="mb-6">
            <TodoForm />
          </div>

          {/* ✅ Filter Buttons */}
          <div className="flex justify-center gap-4 mb-6">
            {["all", "completed", "pending"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm transition ${
                  filter === type
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/40 text-black dark:text-white hover:bg-white/60'
                }`}
              >
                {type === "all" && "📋 All"}
                {type === "completed" && "✅ Completed"}
                {type === "pending" && "🕒 Pending"}
              </button>
            ))}
          </div>

          {/* ✅ Todo List */}
          <motion.div
            layout
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => (
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
              <p className="text-center italic text-sm opacity-80">
                No todos in this filter. Try adding one! 👆
              </p>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </Todoprovider>
  );
}

export default App;
