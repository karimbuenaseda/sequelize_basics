import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Area = sequelize.define("Area", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

export default Area;