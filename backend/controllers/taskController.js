const Task = require("../models/Task");


// CREATE TASK
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user._id,
    });

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL USER TASKS
const getTasks = async (req, res) => {
  try {
    const {
      search = "",
      status,
      priority,
      dateFilter,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {
      user: req.user._id,
    };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (status) query.status = status;
    if (priority) query.priority = priority;
    
    if (dateFilter === "today") {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);
      query.dueDate = { $gte: todayStart, $lte: todayEnd };
    }

    const total = await Task.countDocuments(query);

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    const now = new Date();
    for (let task of tasks) {
      if (task.dueDate && new Date(task.dueDate) < now && task.status !== "Done" && task.status !== "Overdue") {
        task.status = "Overdue";
        await task.save();
      }
    }

    res.status(200).json({
      tasks,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET TASK STATS
const getTaskStats = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });

    const stats = {
      total: tasks.length,
      todo: tasks.filter(t => t.status === "Todo").length,
      inProgress: tasks.filter(t => t.status === "In Progress").length,
      done: tasks.filter(t => t.status === "Done").length,
      highPriority: tasks.filter(t => t.priority === "High").length,
      overdue: tasks.filter(
        t =>
          t.dueDate &&
          new Date(t.dueDate) < new Date() &&
          t.status !== "Done"
      ).length,
      completionHistory: Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        const dateStr = d.toISOString().split("T")[0];
        const count = tasks.filter(t => 
          t.status === "Done" && 
          new Date(t.updatedAt).toISOString().split("T")[0] === dateStr
        ).length;
        return { date: dateStr, count };
      })
    };

    res.status(200).json(stats);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE TASK
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedTask);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE TASK
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createTask,
  getTasks,
  getTaskStats,
  updateTask,
  deleteTask,
};