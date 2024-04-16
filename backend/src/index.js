import express from 'express';
import User from '../models/user.js';
import Post from '../models/post.js'
import Pcbuild from '../models/pcbuild.js'
import Comment from '../models/comment.js'
import {addItem, connectDB, createNewBuild, deleteItem, getBuildsByUser, updateItem, url} from './db.js';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import path from 'path'
import { mkdir } from 'fs/promises'
import {ls_json, read_json} from './dataset.js';
import cookieParser from "cookie-parser";
import multer from 'multer'
const validmimetypes= [
    "image/gif",
    "image/jpeg",
    "image/png",
]

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(validmimetypes.includes(file.mimetype)) {
        cb(null, path.resolve('uploads', req.session.user._id))
    } else {
        cb ({ message: "Invalid mime type: Accepts only " + validmimetypes })
    }
  },
  filename: function (req, file, cd) {
      cd(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({ storage })

function isLoggedIn(req, res, next) {
    if (req.session) {
        if(!req.session.user) {
            res.status(404).json({ success: false, message: "Not allowed." });
        } else {
            next()
        }
    } else {
        res.redirect("/login")
    }
}

// Connect to the MongoDB database
try {
    await connectDB();
    console.log('Connected to MongoDB');
} catch (err) {
    console.error('Error connecting to Database', err);
}


const app = express();
app.use(cookieParser())
// Middleware to parse JSON bodies
app.use(express.json());


app.use(session({
    name: "halibut",
    secret: 'endymion',
    resave: false,
    saveUninitialized: false,
    store: connectMongo.create({
        mongoUrl: url,
        autoRemove: "native"
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // Session duration (1 day)
        secure: false, //Would need to be over https
        sameSite: 'none'
    },
    unset: 'destroy'
}));

// Route to create user
app.post('/api/register', async (req, res) => {
    try {
        const {username, password} = req.body;

        // Check if a user with the provided username already exists
        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(400).json({error: 'User already exists with this username'});
        }

        const newUser = new User({
            username,
            password
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        req.session.user = savedUser; //Request the user session
        req.session.save((err) => {
            if (err) console.error(err)
            else {
                res.send(req.session.user)
            }
        })
        await mkdir(path.resolve("uploads", savedUser._id.toString()))
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({error: 'Failed to create user'});
    }
});

app.get('/api/is-auth', async (req, res) => {
    res.json({ yes: req.session.user !== undefined });
});

// Route to authenticate user
app.post('/api/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({error: 'Invalid password'});
        }

        // Password is correct, authentication successful
        req.session.user = user; //Request the user session
        req.session.save((err) => {
            if (err) console.error(err)
            else {
                res.send(req.session.user)
            }
        })
    } catch (err) {
        console.error('Error authenticating user:', err);
        res.status(500).json({error: 'Failed to authenticate user'});
    }
});

app.post('/api/logout', (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                console.log(err);
            } else {
                console.log("destroyed")
                res.json({message: 'Session is destroyed'})
            }
        });
    } catch (err) {
        console.error('Error logging out:', err);
        res.status(500).json({error: 'Failed to logout'});
    }
});

app.post('/api/create-new-build', isLoggedIn, async (req, res) => {
    try {
        const {buildName} = req.body;
        const result = await createNewBuild(req.session.user._id, buildName);
        if (result.success) {
            res.json({...result});
        } else {
            res.status(500).json({error: "Failed to create build"});
        }
    } catch (err) {
        console.error('Error creating leh build:', err);
        res.status(500).json({error: 'Failed to create leh build'});
    }
});

app.post('/add-item', async (req, res) => {
    try {
        const {userId, itemData} = req.body;
        const result = await addItem(userId, itemData);
        res.json(result);
    } catch (err) {
        console.error('Error adding item:', err);
        res.status(500).json({error: 'Failed to add'});
    }
});

app.delete('/delete-item/:itemId', isLoggedIn, async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const result = await deleteItem(userId, itemId);
        res.json(result);
    } catch (err) {
        console.error('Error deleting item:', err);
        res.status(500).json({error: 'Failed to delete'});
    }
});

app.put('/update-item/:itemId', isLoggedIn, async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const newItem = req.body;
        const result = await updateItem(req.session.user._id, itemId, newItem);
        res.json(result);
    } catch (err) {
        console.error('Error updating item:', err);
        res.status(500).json({error: 'Failed to update'});
    }
});
// Get a single build by ID
app.get('/api/builds/:id', isLoggedIn, async (req, res) => {
  try {
    const buildId = req.params.id;

    // Find the build by ID and check if the user is the owner
    const build = await Pcbuild.findById(buildId)
      //.populate('user', 'name email')
      //.populate('parts');

    if (!build) {
      return res.status(404).json({ message: 'Build not found' });
    }

    res.status(200).json(build);
  } catch (error) {
    console.error('Error getting build:', error);
    res.status(500).json({ message: 'Error getting build' });
  }
});

app.get('/api/builds', isLoggedIn, async (req, res) => {
    try {
        
        const builds = await getBuildsByUser(req.session.user._id);
        res.json(builds);
    } catch (err) {
        console.error('Error fetching the builds:', err);
        res.status(500).json({error: 'Failed to fetch builds'});
    }
});


//Fetching from json dataset
app.get('/api/json/:name', async (req, res) => {
    const jsonName = req.params.name;
    if (!jsonName) {
        res.status(400).json({message: "Undefined name"})
        return;
    }
    let json_file = null
    try {
        json_file = await read_json(jsonName);
    } catch (e) {
    }
    if (!json_file) {
        res.status(400).json({message: "Could not find json data"})
        return;
    }
    res.status(200)
        .json(json_file)
})
app.get('/api/categories', async (_, res) => {
    let json_file = null
    try {
        json_file = await ls_json();
    } catch (e) {
    }
    if (!json_file) {
        res.status(400).json({message: "Could not find json data"})
        return;
    }
    res.status(200)
        .json(json_file)
})

//get single forum by id
app.get("/api/posts/:id", async (req, res) => {
  try {
    const postId = req.params.id;

    // Find the post by ID, populating the comments and user information
    const post = await Post.findById(postId)
      .populate("comments")
      .populate("userId", "name email");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error getting post:", error);
    res.status(500).json({ message: "Error getting post" });
  }
})
//todo: Get all posts
app.get("/api/posts", isLoggedIn, async (req, res) => {
   const posts = await Post.find()
      .populate("comments")
      .populate("userId", "name email")
      .sort({ "comments.length": -1 });
    res.status(200).json(posts);
})

//todo: Create new forum
app.post("/api/posts", isLoggedIn, upload.array("pictures", 10), async (req, res) => {
  try {
    const { title, text } = req.body;
    const usrid = req.session.user._id;
    console.log("/api/posts", usrid)
    const pictures = req
          .files
          .map(file => path.join('uploads', usrid, file.filename));
      console.log(pictures)
    const post = new Post({
        userId: usrid,
        title,
        text,
        pictures,
    });

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating post' });
  }    res.status(200);
})

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
