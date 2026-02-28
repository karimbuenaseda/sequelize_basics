import models from '../models/index.js';
import { checkItemExists } from '../utils/queryHelpers.js';
const { Quiz } = models;

export const createQuiz = async (req, res, next) => {
    try {
        
        const { title, description } = req.body;
        const user = req.user; 
        if (!checkItemExists(title, res, 'Title is required')) {
            return;
        }
        await Quiz.create({ title, description, user_id: user.user_id });
        res.status(200).json({ message: 'Quiz created successfully!' });
    }catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ message: `Error creating quiz: ${error.message}` });
    }
}

export const getQuizzes = async (req, res, next) => {
    try {
        const id = req.params.id;

        if(id){
            const quiz = await Quiz.findByPk(id);
            if (!checkItemExists(quiz, res, 'Quiz not found')) {
                return;
            }
            res.status(200).json(quiz);
        }else{
            const quizzes = await Quiz.findAll();
            res.status(200).json(quizzes);
        }

    }catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ message: `Error fetching quizzes: ${error.message}` });
    }
}

export const deleteQuiz = async (req, res, next) => {
    try{
        const id = req.params.id;
        const quiz = await Quiz.findByPk(id);
        if (!checkItemExists(quiz, res, 'Quiz not found')) {
            return;
        }
        await quiz.destroy();
        res.status(200).json({ message: 'Quiz deleted successfully!' });
    }catch (error) {
        console.error('Error deleting quiz:', error);
        res.status(500).json({ message: `Error deleting quiz: ${error.message}` });
    }
}

export const updateQuiz = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { title, description } = req.body;

        const quiz = await Quiz.findByPk(id);
        if(!checkItemExists(quiz, res, 'Quiz not found')){
            return;
        }

        quiz.title = title || quiz.title;
        quiz.description = description || quiz.description;
        await quiz.save();

        res.status(200).json({
        message: 'Quiz updated successfully!',
        })

    }catch (error) {
        console.error('Error updating quiz:', error);
        res.status(500).json({ message: `Error updating quiz: ${error.message}` });
    }
}