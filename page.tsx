"use client";
import { useEffect, useState } from 'react';

interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
}

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState({ name: '', email: '', age: '' });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students');
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error('Failed to fetch students:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editId ? `/api/students/${editId}` : '/api/students';
    const method = editId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setForm({ name: '', email: '', age: '' });
    setEditId(null);
    fetchStudents();
  };

  const handleEdit = (student: Student) => {
    setForm({ name: student.name, email: student.email, age: String(student.age) });
    setEditId(student.id);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/students/${id}`, { method: 'DELETE' });
    fetchStudents();
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Student Form (CRUD)</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} required />
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
      </form>

      <hr />

      <h2>Students</h2>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} - {s.email} - {s.age}{' '}
            <button onClick={() => handleEdit(s)}>Edit</button>{' '}
            <button onClick={() => handleDelete(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}