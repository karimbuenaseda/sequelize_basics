import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    try {
        
        const { user_name, email, password, role } = req.body;

        if (!user_name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newUser = await User.create({ user_name, email, password, role: role || 'user' });
        const token = jwt.sign({ user_id: newUser.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({
        message: "User created successfully!",
        token,
        user: {
            id: newUser.user_id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
        }
        });

    }catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export const login = async (req, res, next) => {
    try {

        const { user_name, password } = req.body;

        const user = await User.findOne({ where: {user_name: user_name}});

        if (!user || !(await user.validPassword(password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: "Login successful!",
            token
        });

    }catch(error){
        console.error('Error logging in user:', error);
        res.status(500).json({ message: `Error logging in user: ${error.message}` });
    }
}

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token){
        return res.status(401).json({ message: 'Access token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
}