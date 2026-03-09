import express from 'express';
import { verifyToken } from '../controllers/authController.js';
import { submitExam } from '../controllers/quizTakingController.js';

const router = express.Router();
router.post('/submit/:quizId', verifyToken, submitExam);

export default router;