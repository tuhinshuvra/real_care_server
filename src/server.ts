import app from './app';
import { envVars } from './app/config/env';

const PORT = envVars.PORT || 5000;

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