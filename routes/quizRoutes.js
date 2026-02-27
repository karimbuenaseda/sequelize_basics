import express from 'express';
import { verifyToken } from '../controllers/authController.js';
import { createQuiz, getQuizzes, deleteQuiz, updateQuiz } from '../controllers/quizController.js';

const router = express.Router();
router.post('/create', verifyToken, createQuiz);
router.get('/:id', verifyToken, getQuizzes);
router.get('/', verifyToken, getQuizzes);
router.post('/delete/:id', verifyToken, deleteQuiz);
router.post('/update/:id', verifyToken, updateQuiz);

export default router;

