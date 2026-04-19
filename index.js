const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const connectDB = require('./db');
const User = require('./models/User');
const Note = require('./models/Note');

const app = express();        

app.use(cors());              
app.use(express.json());

// ✅ Connect MongoDB
connectDB();

// ==========================
// 🔹 VALIDATION FUNCTIONS
// ==========================

function validateData(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}

// ==========================
// 🔹 AUTH API
// ==========================

// Create Account
app.post('/api/auth/create-account', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!validateData(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({ message: "Weak password" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: newUser._id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ==========================
// 🔹 NOTES API
// ==========================

// Create Note
app.post('/notes', async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get All Notes (sorted)
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find().sort({ isPinned: -1, _id: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Pin / Unpin
app.put('/notes/:id/pin', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    note.isPinned = !note.isPinned;
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update Note
app.put('/notes/:id', async (req, res) => {
  try {
    const updated = await Note.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content
        }
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete Note
app.delete('/notes/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// ==========================
// 🚀 SERVER
// ==========================

app.listen(5001, () => {
  console.log('Server started on port 5001');
});