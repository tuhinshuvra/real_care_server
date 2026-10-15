import app from './app';
import { envVars } from './app/config/env';
import { seedSuperAdmin } from './app/utils/seed';

const PORT = envVars.PORT || 5000;

const bootstrap = async () => {
    try {
        await seedSuperAdmin();
        app.listen(PORT, () => {
            console.log(`Server is running smoothly at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error);
    }
}

bootstrap();