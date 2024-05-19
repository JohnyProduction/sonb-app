const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { expect } = require('chai');

const app = express();
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

describe('API Endpoints', () => {
    beforeEach(() => {
        // Reset users before each test
        users = [];
    });

    it('should register a new user', async () => {
        const response = await request(app)
            .post('/register')
            .send({ username: 'testuser', password: 'testpass' });

        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal('User registered successfully');
    });

    it('should not register a user with an existing username', async () => {
        await request(app)
            .post('/register')
            .send({ username: 'testuser', password: 'testpass' });

        const response = await request(app)
            .post('/register')
            .send({ username: 'testuser', password: 'testpass' });

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Username already exists');
    });

    it('should login a registered user', async () => {
        await request(app)
            .post('/register')
            .send({ username: 'testuser', password: 'testpass' });

        const response = await request(app)
            .post('/login')
            .send({ username: 'testuser', password: 'testpass' });

        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Login successful');
    });

    it('should not login with incorrect credentials', async () => {
        await request(app)
            .post('/register')
            .send({ username: 'testuser', password: 'testpass' });

        const response = await request(app)
            .post('/login')
            .send({ username: 'testuser', password: 'wrongpass' });

        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Invalid username or password');
    });

    it('should receive contact form data', async () => {
        const response = await request(app)
            .post('/contact')
            .send({ name: 'John Doe', email: 'john@example.com', message: 'Hello!' });

        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Data received successfully');
    });

    it('should verify correct answers', async () => {
        const response = await request(app)
            .post('/check-answers')
            .send({ answers: ["Paryż", "Brazylia", "Wodór", "Fiodor Dostojewski", "Morze Śródziemne"] });

        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Odpowiedzi poprawne');
    });

    it('should not verify incorrect answers', async () => {
        const response = await request(app)
            .post('/check-answers')
            .send({ answers: ["Paryż", "Argentyna", "Wodór", "Fiodor Dostojewski", "Morze Śródziemne"] });

        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Odpowiedzi niepoprawne');
    });
});
