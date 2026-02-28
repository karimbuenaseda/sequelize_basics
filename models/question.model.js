import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Question = sequelize.define("Question", {
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

export default Question;
