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
    }
})

export default Option;