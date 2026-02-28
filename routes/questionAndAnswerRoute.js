import express from 'express';
import { verifyToken } from '../controllers/authController.js';
import { createQuestion, getQuestionsByQuizId, updateQuestionAndOptions, deleteQuestion } from '../controllers/questionAndAnswerController.js';

const router = express.Router();

router.post('/create/:quizId', verifyToken, createQuestion);
router.get('/:quizId', verifyToken, getQuestionsByQuizId);
router.post('/update/:questionId', verifyToken, updateQuestionAndOptions);
router.post('/delete/:questionId', verifyToken, deleteQuestion);

export default router;