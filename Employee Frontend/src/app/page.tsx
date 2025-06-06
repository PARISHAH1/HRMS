"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const api = "/employee";

type Employee = {
  id: number | null;
  name: string;
  email: string;
  age: string;
  gender: string;
  phonenumber: string;
  DateOfBirth: string;
};

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState<Employee>({
    id: null,
    name: "",
    email: "",
    age: "",
    gender: "",
    phonenumber: "",
    DateOfBirth: "",
  });

  useEffect(() => {
    fetchEmployees();
    
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(api);
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (form.id) {
      await axios.put(api, form); 
    } else {
      await axios.post(api, form);
    }
    setForm({
      name: "",
      email: "",
      age: "",
      gender: "",
      phonenumber: "",
      DateOfBirth: "",
      id: null,
    });
    fetchEmployees();
  } catch (error) {
    console.error("Error submitting form:", error );
  }
};

  const handleEdit = (employee: Employee) => {
  setForm(employee);
};

const handleDelete = async (id: number | null ) => {
  try {
    await axios.delete(api, { data: { id } }); 
    fetchEmployees();
  } catch (error) {
    console.error("Error deleting employee:", error );
  }
};

  return (
    <div>
      <h1>Employee Management System</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Employee Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        /><br />
        <input
          placeholder="Employee Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          type="email"
          required
        /><br />
        <input
          type="number"
          placeholder="Employee Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          required
        /><br />
        <input
          type="text"
          placeholder="Employee Gender"
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          required
        /><br />
        <input
          type="tel"
          placeholder="Employee Phone Number"
          value={form.phonenumber}
          onChange={(e) => setForm({ ...form, phonenumber: e.target.value })}
          required
        /><br />
        <input
          type="date"
          placeholder="Employee Date of Birth"
          value={form.DateOfBirth}
          onChange={(e) => setForm({ ...form, DateOfBirth: e.target.value })}
          required
        /><br />
        <button type="submit">
          {form.id ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      <div>
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone Number</th>
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.age}</td>
                <td>{employee.gender}</td>
                <td>{employee.phonenumber}</td>
                <td>{employee.DateOfBirth}</td>
                <td>
                  <button onClick={() => handleEdit(employee)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(employee.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}