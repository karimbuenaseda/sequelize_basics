import User from '../models/user.model.js'
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