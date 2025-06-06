// pages/api/students/[id].ts

import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
    body,
  } = req;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  switch (method) {
    case 'PUT': {
      const { name, email, age } = body;

      if (!name || !email || age == null) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      try {
        const result = await pool.query(
          'UPDATE students SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *',
          [name, email, parseInt(age), parseInt(id)]
        );

        if (result.rowCount === 0) {
          return res.status(404).json({ error: 'Student not found' });
        }

        return res.status(200).json(result.rows[0]);
      } catch (err) {
        console.error('PUT Error:', err.message);
        return res.status(500).json({ error: 'Error updating student' });
      }
    }

    case 'DELETE': {
      try {
        const result = await pool.query('DELETE FROM students WHERE id = $1 RETURNING *', [parseInt(id)]);

        if (result.rowCount === 0) {
          return res.status(404).json({ error: 'Student not found' });
        }

        return res.status(200).json({ message: 'Student deleted successfully' });
      } catch (err) {
        console.error('DELETE Error:', err.message);
        return res.status(500).json({ error: 'Error deleting student' });
      }
    }

    default: {
      res.setHeader('Allow', ['PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
}
