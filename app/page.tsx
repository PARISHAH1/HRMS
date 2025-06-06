"use client";
import { useState } from "react";

interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  phoneNumber: string;
  dob: string;
}

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    phoneNumber: "",
    dob: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editId !== null) {
      // Update student
      setStudents((prev) =>
        prev.map((stu) =>
          stu.id === editId
            ? {
                ...stu,
                ...form,
                age: Number(form.age),
              }
            : stu
        )
      );
    } else {
      // Add new student
      const newStudent: Student = {
        id: Date.now(),
        name: form.name,
        email: form.email,
        age: Number(form.age),
        gender: form.gender,
        phoneNumber: form.phoneNumber,
        dob: form.dob,
      };
      setStudents((prev) => [...prev, newStudent]);
    }

    setForm({
      name: "",
      email: "",
      age: "",
      gender: "",
      phoneNumber: "",
      dob: "",
    });
    setEditId(null);
  };

  const handleEdit = (student: Student) => {
    setForm({
      name: student.name,
      email: student.email,
      age: String(student.age),
      gender: student.gender,
      phoneNumber: student.phoneNumber,
      dob: student.dob,
    });
    setEditId(student.id);
  };

  const handleDelete = (id: number) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>Student Form (CRUD)</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          type="email"
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
          min={0}
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          required
          type="tel"
        />
        <input
          name="dob"
          type="date"
          placeholder="Date of Birth"
          value={form.dob}
          onChange={handleChange}
          required
        />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      <hr />

      <h2>Students</h2>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} - {s.email} - {s.age} - {s.gender} - {s.phoneNumber} -{" "}
            {s.dob}{" "}
            <button onClick={() => handleEdit(s)}>Edit</button>{" "}
            <button onClick={() => handleDelete(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
