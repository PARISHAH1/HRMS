// pages/api/students/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM students ORDER BY id DESC');
      return res.status(200).json(result.rows);
    } catch (error) {
      console.error('GET /students error:', error);
      return res.status(500).json({ message: 'Failed to fetch students' });
    }
  }

  if (req.method === 'POST') {
    const { name, email, age } = req.body;

    if (!name || !email || age == null) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const result = await pool.query(
        'INSERT INTO students (name, email, age) VALUES ($1, $2, $3) RETURNING *',
        [name, email, parseInt(age)]
      );
      return res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('POST /students error:', error);
      return res.status(500).json({ message: 'Failed to add student' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
