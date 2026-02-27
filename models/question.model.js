import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Question = sequelize.define("Question", {
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

export default Question;
