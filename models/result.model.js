import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Result = sequelize.define("Result", {
    score: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default Result;