import express from 'express';
import mysql from 'mysql2/promise';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './src/routes/crmRoutes.js';
import { createContactsTable } from './src/models/crmModel.js'; // Import the model

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Connect to MySQL and create the contacts table if it doesn't exist
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to MySQL database');
        await createContactsTable(pool); // Ensure contacts table is created
        connection.release();
    } catch (error) {
        console.error('Error connecting to MySQL database:', error);
    }
})();

// Use routes
routes(app, pool);

app.get('/', (req, res) => {
    res.send(`Node and express server is running on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`);
});
