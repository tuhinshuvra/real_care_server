import app from './app';

const PORT = process.env.PORT || 5000;

const bootstrap = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running smoothly at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error);
    }
}

bootstrap();