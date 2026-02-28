import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Option = sequelize.define("Option", {
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isCorrect: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

export default Option;