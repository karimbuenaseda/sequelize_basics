import sequelize from '../config/database.js';

import { Quiz, QuizType, QuizScore } from './quiz.model.js';
import User from './user.model.js';
import Question from './question.model.js';
import Option from './option.model.js';
import Result from './result.model.js';
import Area from './area.model.js';

User.hasMany(Quiz, { foreignKey: 'user_id' })
Quiz.hasMany(User, { foreignKey: 'user_id' })

Quiz.hasMany(Question, { foreignKey: 'quiz_id' })
Question.belongsTo(Quiz, { foreignKey: 'quiz_id' })

Question.hasMany(Option, { foreignKey: 'question_id' })
Option.belongsTo(Question, { foreignKey: 'question_id' })

User.hasMany(Result, { foreignKey: 'user_id' })
Result.belongsTo(User, { foreignKey: 'user_id' })

Quiz.hasMany(Result, { foreignKey: 'quiz_id' })
Result.belongsTo(Quiz, { foreignKey: 'quiz_id' })

Quiz.hasOne(QuizType, { foreignKey: 'quiz_id' })
QuizType.belongsTo(Quiz, { foreignKey: 'quiz_id' })

Quiz.hasOne(Area, { foreignKey: 'quiz_id' })
Area.belongsTo(Quiz, { foreignKey: 'quiz_id' })

Quiz.hasOne(QuizScore, { foreignKey: 'quiz_id' })
QuizScore.belongsTo(Quiz, { foreignKey: 'quiz_id' })
User.hasMany(QuizScore, { foreignKey: 'user_id' })
QuizScore.belongsTo(User, { foreignKey: 'user_id' })

export default {
    sequelize,
    Quiz,
    User,
    Question,
    Option,
    Result,
    QuizType,
    Area,
    QuizScore,
}