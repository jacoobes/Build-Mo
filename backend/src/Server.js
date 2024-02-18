// an express route /api/json/:id
// in this file so it does not conflict with other commits
// connects server to a port and prints a message

import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST handler for /api/json/:id
app.post('/api/json/:id', (req, res) => {
    const id = req.params.id; // Get the ID from the URL
    const jsonData = req.body; // Get the JSON data from the request body

    console.log(`Received JSON data for ID ${id}:`, jsonData);

    // Respond with a success message
    res.status(200).json({ message: 'JSON data received successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
