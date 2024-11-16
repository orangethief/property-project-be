import './db/index.js';
import express from 'express';
import propertyRouter from './routers/propertyRouter.js';
import userRouter from './routers/userRouter.js';
/* import errorHandler from './middleware/errorHandler.js'; */

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/api/v1/properties', propertyRouter);
app.use('/api/v1/users', userRouter);
/* app.use('*', (req, res) => res.status(404).json({ error: 'Not Found' }));

app.use(errorHandler); */

app.listen(port, () => console.log(`Server is running on port ${port}`))

