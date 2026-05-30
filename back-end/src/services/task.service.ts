import { pool } from '../config/db';

export const getTasks = async () => {
  const result = await pool.query('SELECT * FROM tasks');
  return result.rows;
};

export const createTask = async (name: string) => {
  const query = `
    INSERT INTO tasks (name, status)
    VALUES ($1, $2)
    RETURNING *
  `;

  const values = [name, 'todo'];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const deleteTask = async (id: string) => {
  const result = await pool.query(
    'DELETE FROM tasks WHERE id = $1 RETURNING *',
    [id]
  );

  return result.rows[0];
};

export const updateTask = async (
  id: string,
  name?: string,
  status?: string
) => {
  const query = `
    UPDATE tasks
    SET
      name = COALESCE($1, name),
      status = COALESCE($2, status)
    WHERE id = $3
    RETURNING *
  `;

  const result = await pool.query(query, [name, status, id]);

  return result.rows[0];
};