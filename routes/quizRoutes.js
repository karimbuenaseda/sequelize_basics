import express from 'express';
import { verifyToken } from '../controllers/authController.js';
import { createQuiz, getQuizzes } from '../controllers/quizController.js';

const router = express.Router();
router.post('/create', verifyToken, createQuiz);
router.get('/:id', verifyToken, getQuizzes);
router.get('/', verifyToken, getQuizzes);

export default router;

