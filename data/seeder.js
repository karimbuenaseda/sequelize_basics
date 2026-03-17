import models from '../models/index.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bcrypt from 'bcrypt';

const { sequelize, User, Quiz, Question, Option, Result, QuizType, Area, QuizScore } = models;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const seedData = async () => {
    console.log('Seeding data...');
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        const data = JSON.parse(readFileSync(join(__dirname, 'init.json'), 'utf-8'));

        console.log('Deleting existing data...');
        await Quiz.destroy({where: {}, truncate: true, cascade: true});
        await QuizType.destroy({where: {}, truncate: true, cascade: true});
        await Area.destroy({where: {}, truncate: true, cascade: true});
        await Question.destroy({where: {}, truncate: true, cascade: true});
        await Option.destroy({where: {}, truncate: true, cascade: true});
        
        console.log('Seeding Quizzes...');
        for (const quiz of data.quizzes) {
            console.log(`Seeding quiz: ${quiz.title}`);
            const quizInstance = await Quiz.create({
                title: quiz.title,
                description: quiz.description,
                number_of_questions: quiz.number_of_questions || quiz.questions.length
            })

             // Quiz Types
            console.log('Seeding Quiz Types...');
            if(quiz.quizType && quiz.quizType.length > 0) {
                await QuizType.create({
                    name: quiz.quizType.name,
                    quiz_id: quizInstance.id || quiz.quizType.quizId
                })
            }

            // Areas
            console.log('Seeding Areas...');
            if(quiz.areas && quiz.areas.length > 0) {
                await Area.create({
                    name: quiz.areas.name,
                    quiz_id: quizInstance.id || quiz.areas.quizId
                })
            }

            // Question and Options
            console.log('Seeding Questions and Options...');
            for (const question of quiz.questions) {
                const questionInstance = await Question.create({
                    text: question.text,
                    quiz_id: quizInstance.id || question.quizId
                })

                for (const option of question.options) {
                    await Option.create({
                        text: option.text,
                        isCorrect: option.isCorrect,
                        isActive: option.isActive,
                        question_id: questionInstance.id || option.questionId
                    })
                }
            }

        }

        console.log('Database seeded successfully!');
        process.exit(0);

    }catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seedData();
