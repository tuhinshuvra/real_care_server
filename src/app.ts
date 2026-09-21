
import express, { Application, Request, Response } from 'express';
import { indexRoutes } from './app/routes';
import { globalErrorHandlar } from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notFound';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', indexRoutes);

app.get('/', async (req: Request, res: Response) => {
    // throw new AppError(status.BAD_REQUEST, "Just Testing Error Handlar");

    res.json({ message: 'Hari OM, Welcome to HealthCare Backend API' });
});

app.use(globalErrorHandlar);
app.use(notFound);

// app.use((req: Request, res: Response, next: NextFunction) => {
//     res.status(404).json({
//         success: false,
//         message: "API not found"
//     })

// })
export default app;