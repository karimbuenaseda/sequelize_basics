import jwt from 'jsonwebtoken';
import models from '../models/index.js';

const { User } = models;

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.user_id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    }catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
        next(error)
    }
}

export default verifyToken;