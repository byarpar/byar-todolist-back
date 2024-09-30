import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());
app.use(express.json());

// MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database!');
});

// Routes
app.get('/', (req, res) => {
    res.send('Node.js MySQL API is running!');
});

app.get('/contacts', (req, res) => {
    const sql = 'SELECT * FROM contacts';
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.post('/contacts', (req, res) => {
    const { firstName, lastName, email, company, phone } = req.body;
    const sql = 'INSERT INTO contacts (firstName, lastName, email, company, phone) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [firstName, lastName, email, company, phone], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Contact added successfully!', id: result.insertId });
    });
});

app.put('/contacts/:id', (req, res) => {
    const { firstName, lastName, email, company, phone } = req.body;
    const sql = 'UPDATE contacts SET firstName = ?, lastName = ?, email = ?, company = ?, phone = ? WHERE id = ?';
    connection.query(sql, [firstName, lastName, email, company, phone, req.params.id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Contact updated successfully!' });
    });
});

app.delete('/contacts/:id', (req, res) => {
    const sql = 'DELETE FROM contacts WHERE id = ?';
    connection.query(sql, [req.params.id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Contact deleted successfully!' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
