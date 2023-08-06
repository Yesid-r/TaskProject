import express from 'express';

import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.js';
import projectRouter from './routes/project.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: true,
    credentials: true,
}
app.get('/', (req, res) => {
    res.send('Hello to memories API');
})
mongoose.set('strictQuery', false);
const connect = async () => {
    try {
        
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
        
    } catch (error) {
        console.log(error.message);
    }
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/project', projectRouter);

app.listen(PORT, () => {
    connect();
    console.log(`Server running on port ${PORT}`);
})
