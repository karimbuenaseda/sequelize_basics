import express from 'express'
import models from './models/index.js';
import authRoutes from './routes/authRoutes.js'
import quizRoutes from './routes/quizRoutes.js'

const { sequelize } = models;

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/auth', authRoutes)
app.use('/api/quiz', quizRoutes)

const startServer = async () => {
    try{
        try{
            await sequelize.authenticate();
            console.log('Database Connected');
        }catch (error){
            console.error('Unable to connect to the database:', error);
            process.exit(1);
        }

        await sequelize.sync({ alter: true });
        console.log('Database Synced');

        const PORT = process.env.PORT || 8090
        app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`)
        })

    }catch (error){
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

startServer();