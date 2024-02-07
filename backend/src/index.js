import express from 'express';

const app = express();

// Middleware setup
app.use(express.json());
//app.use(cors());

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Example route with dynamic parameter
app.get('/api/user/:id', (req, res) => {
  const userId = req.params.id;
  // Fetch user data from database or any other source
  res.json({ id: userId, name: 'John Doe', email: 'john@example.com' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

