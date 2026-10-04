import express, { Application, Request, Response } from 'express';
import { indexRoutes } from './app/routes';
import { globalErrorHandlar } from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notFound';
import cookieParser from 'cookie-parser';
import { toNodeHandler } from 'better-auth/node';
import { envVars } from './app/config/env';
import { auth } from './app/lib/auth';
import path from 'path';
import cors from 'cors';
import qs from 'qs';


const app: Application = express();
app.set("query parser", (str: string) => qs.parse(str));

app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), `src/app/templates`));

app.use(cors({
    origin: [envVars.FRONTEND_URL, envVars.BETTER_AUTH_URL, "http://localhost:3000", "http://localhost:5000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/api/auth", toNodeHandler(auth));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

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