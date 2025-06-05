const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let tasks = [
    {id: 1, title: 'Task 1', completed: false},
    {id: 2, title: 'Task 2', completed: false},
];


app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Server Status</title>
            <style>
                body {
                    background: #f0f4f8;
                    display: flex;
                    height: 100vh;
                    align-items: center;
                    justify-content: center;
                    font-family: Arial, sans-serif;
                }
                .msg {
                    background: #fff;
                    padding: 2rem 3rem;
                    border-radius: 10px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                    font-size: 1.5rem;
                    color: #2d7a2d;
                    border: 1px solid #e0e0e0;
                }
            </style>
        </head>
        <body>
            <div class="msg">Server is running </div>
        </body>
        </html>
    `);
});


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
