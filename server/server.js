require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/database');
const scholarshipRoutes = require('./routes/scholarship');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database');
});

// Routes
app.use('/api', scholarshipRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));