import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

export const Quiz = sequelize.define("Quiz", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
    },
    number_of_questions: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
        allowNull: false
    },
})

export const QuizType = sequelize.define("QuizType", {
    name: DataTypes.STRING,
})
