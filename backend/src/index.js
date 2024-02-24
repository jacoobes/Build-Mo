    import express from 'express';
    import User from '../models/user.js';
    import {connectDB, url, addItem, deleteItem, updateItem } from './db.js';
    import bcrypt from 'bcryptjs';
    import cors from 'cors';
    import session from 'express-session';
    import connectMongo from 'connect-mongo';
    import { ls_json, read_json } from './dataset.js';

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
        },
        unset: 'destroy'
    }));

    //Make sure the that 5005 can edit 3000
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      next();
    });

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

    app.get('/logout', (req, res) => {
        try {
            req.session.destroy(); // Destroy the session
            res.status(200).json({ message: 'Logout successful' });
        } catch (err) {
            console.error('Error logging out:', error);
            res.status(500).json({ error: 'Failed to logout' });
        }
    });

    app.post('/add-item', async (req, res) => {
        try {
            const { userId, itemData } = req.body;
            const result = await addItem(userId, itemData);
            res.json(result);
        } catch (err) {
            console.error('Error adding item:', err);
            res.status(500).json({ error: 'Failed to add' });
        }
    });

    app.delete('/delete-item/:itemId', async (req, res) => {
        try {
            const itemId = req.params.itemId;
            const result = await deleteItem(userId, itemId);
            res.json(result);
        } catch (err){
            console.error('Error deleting item:', err);
            res.status(500).json({error: 'Failed to delete'});
        }
    });

    app.put('/update-item/:itemId', async (req, res) => {
        try {
            const itemId = req.params.itemId;
            const newItem = req.body;
            const result = await updateItem(userId, itemId, newItem);
            res.json(result);
        } catch (err){
            console.error('Error updating item:', err);
            res.status(500).json({error: 'Failed to update'});
        }
    });
    //Fetching from json dataset
    app.get('/api/json/:name', async (req, res) => {
        const jsonName = req.params.name;
        if(!jsonName) {
            res.status(400).json({ message: "Undefined name" })
            return;
        }
        let json_file = null
        try {
            json_file = await read_json(jsonName);
        }
        catch(e) {}
        if(!json_file) {
            res.status(400).json({ message: "Could not find json data" })
            return;
        }
        res.status(200)
           .json(json_file)
    })
    app.get('/api/categories', async (_, res) => {
        let json_file = null
        try {
            json_file = await ls_json();
        }
        catch(e) {}
        if(!json_file) {
            res.status(400).json({ message: "Could not find json data" })
            return;
        }
        res.status(200)
           .json(json_file)
    })

    const PORT = process.env.PORT || 5005;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
