const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Import the schema we just created

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allow frontend to send requests
app.use(express.json()); // Allow backend to read JSON data

// 1. Connect to MongoDB (Ensure MongoDB Compass/Local is running)
mongoose.connect('mongodb://127.0.0.1:27017/taxpal_db')
    .then(() => console.log(" MongoDB Connected"))
    .catch(err => console.log(" MongoDB Error:", err));

// --- ROUTES ---

// Register Route
app.post('/register', async (req, res) => {
    const { name, email, password, country, income_bracket } = req.body;

    try {
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Encrypt password (Requirement from PDF)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            country, 
            income_bracket 
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.json({ message: "Login successful", user: { name: user.name, email: user.email } });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

