import express from 'express'
import sequelize from './config/database.js';
import authRoutes from './routes/authRoutes.js'

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/auth', authRoutes)

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