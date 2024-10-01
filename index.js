import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db'; // Import MySQL connection
import routes from './src/routes/crmRoutes'; // Import routes

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from environment or default to 3000

// Enable CORS
app.use(cors());

// Body-parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize routes and pass MySQL database connection
routes(app, db);

// Root route
app.get('/', (req, res) => {
    res.send(`Node and Express server is running on port ${PORT}`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`);
});
