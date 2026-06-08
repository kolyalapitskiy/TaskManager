import { pool } from '../config/db';

type UpdateTaskDto = {
  name?: string;
  status?: string;
  description?: string;
};

export const getTasks = async (userId: number) => {
  const result = await pool.query(`
    SELECT *
    FROM tasks
    WHERE user_id = $1
    ORDER BY id DESC
  `, [userId]);

  return result.rows;
};

export const createTask = async (
  name: string,
  userId: number
) => {
  const query = `
    INSERT INTO tasks (
      name,
      status,
      description,
      user_id
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const values = [
    name,
    'todo',
    '',
    userId
  ];

  const result = await pool.query(
    query,
    values
  );

  return result.rows[0];
};

export const deleteTask = async (
  id: string,
  userId: number
) => {
  const result = await pool.query(
    `
      DELETE FROM tasks
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `,
    [id, userId]
  );

  return result.rows[0];
};

export const updateTask = async (
  id: string,
  updates: UpdateTaskDto,
  userId: number
) => {
  const allowedFields = [
    'name',
    'status',
    'description',
  ];

  const filteredUpdates =
    Object.entries(updates).filter(
      ([key, value]) =>
        allowedFields.includes(key) &&
        value !== undefined
    );

  if (filteredUpdates.length === 0) {
    return null;
  }

  const setClause =
    filteredUpdates
      .map(
        ([key], index) =>
          `"${key}" = $${index + 1}`
      )
      .join(', ');

  const values: Array<string | number> =
    filteredUpdates.map(
      ([_, value]) => value as string
    );

  values.push(id);
  values.push(userId);

  const query = `
    UPDATE tasks
    SET ${setClause}
    WHERE id = $${values.length - 1} AND user_id = $${values.length}
    RETURNING *
  `;

  const result = await pool.query(
    query,
    values
  );

  return result.rows[0];
};
