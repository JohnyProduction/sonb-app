const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

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
    res.cookie('status', 'logged', { httpOnly: true });
    res.json({ message: 'Login successful' });
});
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    console.log('Received contact form data:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    res.status(200).json({ message: 'Data received successfully' });
});
// Oczekiwane odpowiedzi
const correctAnswers = [
    "Paryż",
    "Brazylia",
    "Wodór",
    "Fiodor Dostojewski",
    "Morze Śródziemne"
  ];
  
  app.post('/check-answers', (req, res) => {
    const submittedAnswers = req.body.answers;
  
    const isCorrect = submittedAnswers.every((answer, index) => {
      return answer === correctAnswers[index];
    });
  
    if (isCorrect) {
      res.status(200).json({ message: 'Odpowiedzi poprawne' });
    } else {
      res.status(401).json({ message: 'Odpowiedzi niepoprawne' });
    }
  });

const PORT = 3333;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
