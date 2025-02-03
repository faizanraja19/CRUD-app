import { useState } from 'react';

export default function Home() {
  // State to store tasks
  const [tasks, setTasks] = useState([]);
  // State to handle the input for a new task
  const [newTask, setNewTask] = useState('');
  // State to track which task is being edited
  const [editingTaskId, setEditingTaskId] = useState(null);
  // State to store the updated title during editing
  const [updatedTitle, setUpdatedTitle] = useState('');

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim() === '') return; // Prevent empty tasks
    const task = {
      id: Date.now(), // Unique ID for each task
      title: newTask,
    };
    setTasks([...tasks, task]); // Add the new task to the list
    setNewTask(''); // Clear the input field
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id)); // Remove the task with the given ID
  };

  // Function to enable editing mode for a task
  const startEditing = (id, title) => {
    setEditingTaskId(id); // Set the task ID being edited
    setUpdatedTitle(title); // Set the current title for editing
  };

  // Function to save the updated task
  const saveTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: updatedTitle } : task
      )
    );
    setEditingTaskId(null); // Exit editing mode
    setUpdatedTitle(''); // Clear the updated title
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Task Manager
        </h1>

        {/* Input field for adding a new task */}
        <div className="flex mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 border border-gray-300 rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={addTask}
            className="bg-purple-500 text-white px-6 rounded-r-lg hover:bg-purple-600 transition-colors"
          >
            Add Task
          </button>
        </div>

        {/* Display the list of tasks */}
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-3 shadow-sm"
            >
              {/* Display input field if the task is being edited */}
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              ) : (
                <span className="text-gray-700">{task.title}</span>
              )}

              {/* Action buttons */}
              <div className="flex space-x-2">
                {/* Show Save button if the task is being edited */}
                {editingTaskId === task.id ? (
                  <button
                    onClick={() => saveTask(task.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing(task.id, task.title)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Edit
                  </button>
                )}

                {/* Delete button */}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}