import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000; // Use process.env.PORT for deployment flexibility

app.use(cors()); // Enable CORS

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,    // MySQL host from Railway environment variable
    user: process.env.DB_USER,    // MySQL user from Railway environment variable
    password: process.env.DB_PASSWORD, // MySQL password from Railway environment variable
    database: process.env.DB_NAME, // MySQL database name from Railway environment variable
    port: process.env.DB_PORT      // MySQL port from Railway environment variable (usually 3306)
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('Connected to MySQL database on Railway!');
});

// Body parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes setup
routes(app);

// Basic route
app.get('/', (req, res) => 
    res.send(`Node and express server is running on port ${PORT}`)
);

// Listen on the specified port
app.listen(PORT, () => 
    console.log(`Your server is running on port ${PORT}`)
);
