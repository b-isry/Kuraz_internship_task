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
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
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

    task.title = req.body.title || task.title;
    task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;

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
