import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import { connectDB } from './db.js';
import cors from 'cors';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import { url } from './db.js';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());


// Connect to the MongoDB database
try {
    await connectDB();
    console.log('Connected to MongoDB');
} catch (err) {
    console.error('Error connecting to Database', err);
}

app.use(session({
    secret: 'thesecretkey', //could be anything
    resave: false,
    saveUninitialized: false,
    store: connectMongo.create({
        mongoUrl: url
    }),
    cookie: {
            maxAge: 1000 * 60 * 60 * 24 // Session duration (1 day)
        }
}));

// Route to create user
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if a user with the provided username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this username' });
        }

        const newUser = new User({
            username,
            password
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        res.json(savedUser);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Route to authenticate user
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Password is correct, authentication successful
        req.session.user = user; //Request the user session
        res.json({ message: 'Authentication successful' });
    } catch (err) {
        console.error('Error authenticating user:', err);
        res.status(500).json({ error: 'Failed to authenticate user' });
    }
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
