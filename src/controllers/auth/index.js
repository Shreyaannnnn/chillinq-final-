const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../../modules/User/user')

const authanticateUser = async (req, res) => {
    const { username, number } = req.body;

    const existingUser = await User.findOne({ "username": username });

    if (existingUser) {
        return res.status(400).json({ error: 'Username already taken' });
    }

    const newUser = new User({
        username,
        number,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
};

const loginUser = async (req, res) => {
    const { username, number } = req.body;

    const user = await User.findOne({ username });
    const userId = user._id.toString();

    if (user) {

        const accessToken = jwt.sign({ username: user.username }, 'your-secret-key', { expiresIn: '15m' });
        const refreshToken = jwt.sign({ username: user.username }, 'your-refresh-secret-key', { expiresIn: '7d' });

        res.json({ accessToken, refreshToken, userId });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

const refreshToken = (req, res) => {
    const { refreshToken } = req.body;
    jwt.verify(refreshToken, 'your-refresh-secret-key', (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        // Generate a new access token
        const accessToken = jwt.sign({ username: user.username }, 'your-secret-key', { expiresIn: '15m' });

        res.json({ accessToken });
    });
};

module.exports = {
    authanticateUser,
    loginUser,
    refreshToken
};
