import models from '../models/index.js';
import { checkItemExists, errorMessage } from '../utils/queryHelpers';

const { Quiz, Question, Option, User, QuizScore } = models;

export const submitExam = async (req, res, next) => {
    try {
        const quizId = req.params.quizId;
        const userId = req.user.user_id;
        const { questions, answers } = req.body;

        // Collect Q&A from user input into a hashmap for easy access
        const userAnswers = {};
        questions.forEach((questionID, index) => {
            userAnswers[questionID] = answers[index];
        })

        // Fetch all Q&A from the database for the given quiz
        const quizQuestion = await Quiz.findByPk(quizId);
        if(!checkItemExists(quizQuestion, res, 'Quiz not found')){
            return;
        }
        
        const dbQuestions = await Question.findAll({
            where: {quiz_id: quizId},
        })

        let score = 0;
        dbQuestions.forEach(async (question) => {
            const userAnswer = userAnswers[question.id];
            const correctAnswer = await Option.findOne({
                where: {
                    question_id: question.id,
                    isCorrect: true
                }
            })

            if(userAnswer === correctAnswer.text){
                score++;
            }
        })

        // Save score to DB
        await QuizScore.create({
            score: score,
            user_id: userId,
            quiz_id: quizId
        })

        res.status(200).json({
            message: `Exam submitted successfully. Your score is ${score}/${dbQuestions.length}`
        })

    }catch(error){
        errorMessage(res, `Error submitting exam: ${error.message}`);
    }
}
