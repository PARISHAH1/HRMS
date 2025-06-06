import React, { useEffect, useState } from "react";
import axios from "axios";


const apiUrl = "http://localhost:5050/employee";

export default function Home() {

  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    phonenumber: "",
    DateOfBirth: "",
    id: null,
  });


  useEffect(() => {
    getEmployees();
  }, []);

  
  function getEmployees() {
    axios.get(apiUrl).then((res) => {
      setEmployees(res.data);
    });
  }

  
  function handleSubmit(e) {
    e.preventDefault();
    if (form.id) {
     
      axios.put(apiUrl + "/" + form.id, form).then(() => {
        setForm({
          name: "",
          email: "",
          age: "",
          gender: "",
          phonenumber: "",
          DateOfBirth: "",
          id: null,
        });
        getEmployees();
      });
    } else {

      axios.post(apiUrl, form).then(() => {
        setForm({
          name: "",
          email: "",
          age: "",
          gender: "",
          phonenumber: "",
          DateOfBirth: "",
          id: null,
        });
        getEmployees();
      });
    }
  }

  function handleEdit(emp) {
    setForm(emp);
  }


  function handleDelete(id) {
    axios.delete(apiUrl + "/" + id).then(() => {
      getEmployees();
    });
  }

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h1>Employee Management System</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={{ display: "block", marginBottom: 10, width: "100%", padding: 8 }}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          type="email"
          required
          style={{ display: "block", marginBottom: 10, width: "100%", padding: 8 }}
        />
        <input
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          type="number"
          required
          style={{ display: "block", marginBottom: 10, width: "100%", padding: 8 }}
        />
        <input
          placeholder="Gender"
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          required
          style={{ display: "block", marginBottom: 10, width: "100%", padding: 8 }}
        />
        <input
          placeholder="Phone Number"
          value={form.phonenumber}
          onChange={(e) => setForm({ ...form, phonenumber: e.target.value })}
          type="tel"
          required
          style={{ display: "block", marginBottom: 10, width: "100%", padding: 8 }}
        />
        <input
          placeholder="Date of Birth"
          value={form.DateOfBirth}
          onChange={(e) => setForm({ ...form, DateOfBirth: e.target.value })}
          type="date"
          required
          style={{ display: "block", marginBottom: 10, width: "100%", padding: 8 }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          {form.id ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ padding: 12, borderBottom: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: 12, borderBottom: "1px solid #ddd" }}>Email</th>
            <th style={{ padding: 12, borderBottom: "1px solid #ddd" }}>Age</th>
            <th style={{ padding: 12, borderBottom: "1px solid #ddd" }}>Gender</th>
            <th style={{ padding: 12, borderBottom: "1px solid #ddd" }}>Phone</th>
            <th style={{ padding: 12, borderBottom: "1px solid #ddd" }}>DOB</th>
            <th style={{ padding: 12, borderBottom: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: 12 }}>{emp.name}</td>
              <td style={{ padding: 12 }}>{emp.email}</td>
              <td style={{ padding: 12 }}>{emp.age}</td>
              <td style={{ padding: 12 }}>{emp.gender}</td>
              <td style={{ padding: 12 }}>{emp.phonenumber}</td>
              <td style={{ padding: 12 }}>{emp.DateOfBirth}</td>
              <td style={{ padding: 12 }}>
                <button
                  onClick={() => handleEdit(emp)}
                  style={{
                    marginRight: 8,
                    padding: "6px 12px",
                    backgroundColor: "#2196F3",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(emp.id)}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}