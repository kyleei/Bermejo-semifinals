// controllers/taskController.js
const Task = require("../models/taskModel"); // Renamed this to Task to avoid confusion

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    // Assuming `Task` is an array of tasks or a method to fetch tasks
    res.status(200).json({ message: "Tasks retrieved successfully", data: Task });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

// Get a specific task by ID
const getTaskById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const task = Task.find((task) => task.id === id); // Task is now the array/model name
    if (task) {
      res.status(200).json({ message: "Task retrieved successfully", data: task });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

// Add a new task
const addTask = async (req, res) => {
  try {
    const { task, status } = req.body;
    if (!task || !status) {
      return res.status(400).json({ message: "'task' and 'status' are required" });
    }

    const newTask = {
      id: Task.length + 1,  // Auto-increment ID (you may want to use a better strategy)
      task,                 // Task name from request body
      status                // Status from request body
    };

    Task.push(newTask);  // Add the new task to the Task array

    res.status(201).json(newTask);  // Send the newly added task
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

// Update an existing task
const updateTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = Task.findIndex((task) => task.id === id); // Find index of the task
    if (index !== -1) {
      // Merge the existing task with updated fields
      Task[index] = { ...Task[index], ...req.body };
      res.status(200).json({ message: "Task updated successfully", data: Task[index] });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = Task.findIndex((task) => task.id === id); // Find index of the task
    if (index !== -1) {
      Task.splice(index, 1); // Remove the task from the array
      res.status(200).json({ message: "Task deleted successfully", data: Task });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
};