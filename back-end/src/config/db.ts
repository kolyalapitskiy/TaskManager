import { Pool } from 'pg';

console.log("Попытка подключения к базе...");

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Это ВАЖНО для многих облачных БД, включая Railway
    }
});

pool.connect()
    .then(() => console.log("✅ Успешно подключено к базе данных Railway!"))
    .catch((error) => {
        console.error("❌ Ошибка подключения к базе:");
        console.error("Сообщение:", error.message);
        console.error("DATABASE_URL установлен:", !!process.env.DATABASE_URL);
    });