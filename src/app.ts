
import express, { Application, Request, Response } from 'express';
import { indexRoutes } from './app/routes';
// import { prisma } from './app/lib/prisma';

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', indexRoutes);

app.get('/', async (req: Request, res: Response) => {
    // const speciality = await prisma.speciality.create({
    //     data: {
    //         title: 'Cardiology',
    //     }
    // })
    // res.status(201).json({
    //     success: true,
    //     message: 'Hari OM, API is working successfully',
    //     data: speciality
    // });

    res.json({ message: 'Hari OM, Welcome to our API' });
});

export default app;