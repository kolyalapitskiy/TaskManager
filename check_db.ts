import { pool } from './back-end/src/config/db';
import dotenv from 'dotenv';
dotenv.config();

async function check() {
  try {
    const res = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'tasks'");
    console.log('Columns in "tasks" table:');
    console.table(res.rows);
    
    const tasks = await pool.query("SELECT * FROM tasks LIMIT 1");
    console.log('Sample task data:');
    console.log(tasks.rows[0]);
    
    process.exit(0);
  } catch (err) {
    console.error('Error checking DB:', err);
    process.exit(1);
  }
}
check();
