// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const motivasiRoute = require('./routes/motivasi');

app.use(cors());
app.use(express.json());

// Serve static files from "public"
app.use(express.static(path.join(__dirname, 'public')));

// API route
app.use('/api/motivasi', motivasiRoute);

// Return index.html when visiting "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});