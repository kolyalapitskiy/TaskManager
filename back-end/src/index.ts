import express from 'express';
import cors from 'cors';
import {Pool} from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT 
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

app.use(cors());
app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Бэкенд Kanban-доски работает! 🚀');
// });

// app.post('/api/register', async (req, res) => {
//   try {
//     const { username, email, password } = req.body; // Добавили email
//     if (!username || !email || !password) {
//       return res.status(400).json({ error: "Заполните все поля (логин, почта, пароль)" });
//     }
//     if (!email.includes('@')) {
//       return res.status(400).json({ error: "Некорректный формат email" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email';
//     const result = await pool.query(query, [username, email, hashedPassword]);
//     res.status(201).json(result.rows[0]);
//   } catch (error: any) {
//     if (error.code === '23505') {
//       return res.status(400).json({ error: "Логин или Email уже заняты" });
//     }
//     console.error(error);
//     res.status(500).json({ error: "Ошибка при регистрации" });
//   }
// });
// app.post('/api/login', async (req, res) => {
//   try {
//     const {email, password} = req.body;
    
//   } catch (err) {

//   }
// })


pool.connect()
    .then(() => console.log("Database was succesfully connected!"))
    .catch((error) => console.log(error))

app.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/tasks', async (req, res) => {
  console.log(`REG: ${req}`, `RES: ${req}`)
  try {
    const {name} = req.body;

    if(!name) {
      return res.status(400).json({error: "Название задачи обязательно"})
    }

    const query = 'INSERT INTO tasks (name, status) VALUES ($1, $2) RETURNING *';
    const values = [name, 'todo'];

    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error)
    res.status(500).json({error: "Ошибка при сохранении в бд"})
  }
})

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id])
    res.json({message: 'Задача удалена', task: result.rows[0]})
  } catch {
    console.error("Ошибка при удалении")
  }
})

app.patch('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body
    const query = `
      UPDATE tasks
      SET
        name = COALESCE($1, name),
        status = COALESCE($2, status)
      WHERE id = $3
      RETURNING *`;
    const result = await pool.query(query, [name, status, id]);
    res.json(result.rows[0])
  } catch (error) {
    console.error(error);
  }
  
})

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

