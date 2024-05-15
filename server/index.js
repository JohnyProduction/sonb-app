const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let users = [];

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    users.push({ username, password });
    res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful' });
});

const PORT = 3333;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


/*
-write login api
-write register api
-write api which return isLogged
*/