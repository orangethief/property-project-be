import './db/index.js';
import cors from 'cors';
import express from 'express';
import authRouter from './routers/authRouter.js';
import propertyRouter from './routers/propertyRouter.js';
import userRouter from './routers/userRouter.js';
import errorHandler from './middleware/errorHandler.js';
import ApiError from './utils/ApiError.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/properties', propertyRouter);
app.use('/api/v1/users', userRouter);

app.use(errorHandler);

app.use('*', (req, res) => {
    throw new ApiError('Did not found', 404);
});

app.listen(port, () => console.log(`Server is running on port ${port}`))

