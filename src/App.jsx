import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

const API_URL = "https://sbdtutam9-backend-production.up.railway.app";

function Home() {
  return (
    <main className="flex flex-col items-center justify-center text-center px-5 md:px-8 mt-20">
      <h2 className="text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
        Organize Your Life
      </h2>
      <p className="mt-8 text-xl md:text-2xl max-w-3xl text-gray-300">
        A minimalistic yet powerful To Do app to help you manage your tasks
        effortlessly. Built with cutting-edge technology and designed for
        elegance.
      </p>
      <div className="mt-12 flex space-x-8">
        <Link to="/add-task">
          <button className="px-10 py-4 text-lg font-medium bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg hover:opacity-90 transition">
            Add Task
          </button>
        </Link>
        <Link to="/view-task">
          <button className="px-10 py-4 text-lg font-medium bg-gradient-to-r from-red-400 to-orange-500 rounded-lg shadow-lg hover:opacity-90 transition">
            View Tasks
          </button>
        </Link>
      </div>
    </main>
  );
}

function AddTask() {
  const [description, setDescription] = useState("");

  const handleAddTask = async () => {
    try {
      if (!description.trim()) {
        alert("Description is required");
        return;
      }
      await axios.post(`${API_URL}/todos`, { description });
      alert("Task added successfully!");
      setDescription("");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center px-5 md:px-8 mt-20">
      <h2 className="text-6xl font-bold mb-8">Add Task</h2>
      <input
        type="text"
        placeholder="Enter task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="px-4 py-2 text-lg rounded-lg shadow-md mb-4"
      />
      <button
        onClick={handleAddTask}
        className="px-10 py-4 text-lg font-medium bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg hover:opacity-90 transition"
      >
        Add Task
      </button>
    </div>
  );
}

function ViewTask() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_URL}/todos`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center px-5 md:px-8 mt-20">
      <h2 className="text-6xl font-bold mb-8">View Tasks</h2>
      <ul className="text-gray-300 text-xl">
        {tasks.map((task) => (
          <li key={task.id} className="mb-4 flex justify-between items-center">
            <span>{task.description}</span>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="ml-4 px-4 py-2 text-sm font-medium bg-gradient-to-r from-red-400 to-orange-500 rounded-lg shadow-lg hover:opacity-90 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GetStarted() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-5 md:px-8 mt-20">
      <h2 className="text-6xl font-bold mb-8">Get Started</h2>
      <p className="text-gray-300 text-xl">
        Welcome! Start organizing your life with our To Do app.
      </p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white font-sans">
        {/* Background Grain Effect */}
        <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none"></div>

        {/* Header */}
        <header className="py-8 px-5 md:px-8 flex justify-between items-center">
          <h1 className="text-5xl font-bold tracking-tight">
            <Link to="/">To Do App</Link>
          </h1>
          <Link to="/get-started">
            <button className="px-8 py-3 text-lg font-medium bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-lg hover:opacity-90 transition">
              Get Started
            </button>
          </Link>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/view-task" element={<ViewTask />} />
          <Route path="/get-started" element={<GetStarted />} />
        </Routes>

        {/* Footer */}
        <footer className="mt-32 py-8 px-5 md:px-8 text-center text-gray-500">
          <p>&copy; Tutam SBD9 Muhammad Arya Wiandra Utomo.</p>
          <p>All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
