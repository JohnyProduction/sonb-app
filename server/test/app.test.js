const request = require('supertest');
const app = require('../index'); // Assuming your Express app is defined in app.js

describe('API Endpoints', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/register')
            .send({ email: 'test@example.com', name: 'Test User', password: 'testpass' });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    it('should not register a user with an existing email', async () => {
        await request(app)
            .post('/register')
            .send({ email: 'test@example.com', name: 'Test User', password: 'testpass' });

        const response = await request(app)
            .post('/register')
            .send({ email: 'test@example.com', name: 'Another User', password: 'testpass' });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Email already exists');
    });

    it('should login a registered user', async () => {
        await request(app)
            .post('/register')
            .send({ email: 'test@example.com', name: 'Test User', password: 'testpass' });

        const response = await request(app)
            .post('/login')
            .send({ email: 'test@example.com', password: 'testpass' });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login successful');
    });

    it('should not login with incorrect credentials', async () => {
        await request(app)
            .post('/register')
            .send({ email: 'test@example.com', name: 'Test User', password: 'testpass' });

        const response = await request(app)
            .post('/login')
            .send({ email: 'test@example.com', password: 'wrongpass' });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid email or password');
    });

    it('should receive contact form data', async () => {
        const response = await request(app)
            .post('/contact')
            .send({ name: 'John Doe', email: 'john@example.com', message: 'Hello!' });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Data received successfully');
    });

    it('should verify correct answers', async () => {
        const response = await request(app)
            .post('/check-answers')
            .send({ answers: ["Paryż", "Brazylia", "Wodór", "Fiodor Dostojewski", "Morze Śródziemne"] });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Odpowiedzi poprawne');
    });

    it('should not verify incorrect answers', async () => {
        const response = await request(app)
            .post('/check-answers')
            .send({ answers: ["Paryż", "Argentyna", "Wodór", "Fiodor Dostojewski", "Morze Śródziemne"] });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Odpowiedzi niepoprawne');
    });
});
