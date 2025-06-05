const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let tasks = [
    {id: 1, title: 'Task 1', completed: false},
    {id: 2, title: 'Task 2', completed: false},
];

app.get('/ping', (req, res) => {
    res.json({message: 'pong'});
});

app.get('/tasks', (req, res) => {
    const { status } = req.query;
    let filteredTasks = tasks;

    if (status === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (status === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    res.json(filteredTasks);
});

app.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ message: 'Title is required and must not be empty.' });
    }
    const newTask = {
        id: tasks.length + 1,
        title: title.trim(),
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === taskId);
    
    if (!task) {
        return res.status(404).json({message: 'Task not found'});
    }

    if (req.body.title !== undefined) {
        if (typeof req.body.title !== 'string' || req.body.title.trim() === '') {
            return res.status(400).json({ message: 'Title must not be empty.' });
        }
        task.title = req.body.title.trim();
    }
    if (req.body.completed !== undefined) {
        task.completed = req.body.completed;
    }

    res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    tasks = tasks.filter(t => t.id !== taskId);
    
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
