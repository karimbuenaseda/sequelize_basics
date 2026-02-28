import models from '../models/index.js';
import { checkItemExists, errorMessage } from '../utils/queryHelpers.js';

const { Question, Option, Quiz } = models;

export const createQuestion = async (req, res, next) => {
    try {
        const quizId = req.params.quizId;

        const { text, options } = req.body;

        const quiz = await Quiz.findByPk(quizId);
        if(!checkItemExists(quiz, res, 'Create a quiz before adding questions')){
            return;
        }

        const question = await Question.create({
            text: text,
            quiz_id: quizId
        })

        if (options.length < 2){
            return res.status(404).json({
                message: 'A question must have at least 2 options'
            })
        }
        
        for (const option of options) {
            await Option.create({
                text: option.text,
                isCorrect: option.isCorrect,
                question_id: question.id
            })
        }

        res.status(201).json({
            message: `Question created successfully with id ${question.id}`
        })

    }catch (error) {
        res.status(500).json({
            message: `Error creating question: ${error.message}`
        })
    }
}

export const getQuestionsByQuizId = async (req, res, next) => {
    try {
        const quizId = req.params.quizId;

        if(!checkItemExists(quizId, res, 'Quiz not found')){
            return;
        }

        const questions = await Question.findAll({
            where: { quiz_id: quizId },
            include: [{ model: Option }]
        })

        res.status(200).json(questions);
    }catch (error){
        console.log(error);
        res.status(500).json({
            message: `Error fetching questions: ${error.message}`
        })
    }
}

export const updateQuestionAndOptions = async (req, res, next) => {
    try{
        const questionId = req.params.questionId;
        const { text, options } = req.body;

        const question = await Question.findByPk(questionId);

        if(!checkItemExists(question, res, 'Question not found')){
            return;
        }

        question.text = text || question.text;

        await question.save();

        if (options && options.length > 0){
            for (const option of options){
                const existingOption = await Option.findOne({
                    where: {
                        id: option.id,
                    }
                })

                if(existingOption){
                    existingOption.text = option.text || existingOption.text;
                    existingOption.isCorrect = option.isCorrect !== undefined ? option.isCorrect : existingOption.isCorrect;
                    await existingOption.save();
                }
            }
        }

        res.status(200).json({
            message: `Question ${question.id} updated successfully!`
        })

    }catch (error){
        errorMessage(res, `Error updating question: ${error.message}`);
    }
}

export const deleteQuestion = async (req, res, next) => {
    try {
        const questionId = req.params.questionId;
        const question = await Question.findByPk(questionId);

        if(!checkItemExists(question, res, `Question not found`)){
            return;
        }
        
        question.isActive = false;
        const options = await Option.findAll({
            where: {
                question_id: questionId
            }
        })

        if (options && options.length > 0){
            for (const option of options){
                option.isActive = false;
                await option.save();
            }
        }

        res.status(200).json({
            message: `Question ${question.id} and its options deactivated successfully!`
        })
    }catch (error) {
        errorMessage(res, `Error deleting question: ${error.message}`); 
    }
}
