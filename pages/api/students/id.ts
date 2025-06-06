import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { name, email, age } = req.body;
    const result = await pool.query(
      'UPDATE students SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *',
      [name, email, age, id]
    );
    return res.status(200).json(result.rows[0]);
  }

  if (req.method === 'DELETE') {
    await pool.query('DELETE FROM students WHERE id = $1', [id]);
    return res.status(204).end();
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
