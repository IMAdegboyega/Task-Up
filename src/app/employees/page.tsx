"use client";
import { useState } from "react";

const employees = [
  { id: 1, name: "Esther Howard", email: "name@gmail.com", phone: "+12345678901", role: "Developer", team: "Team 1", photo: "/avatar1.jpg" },
  { id: 2, name: "Wade Warren", email: "name@gmail.com", phone: "+12345678901", role: "Designer", team: "Team 1", photo: "/avatar2.jpg" },
  { id: 3, name: "Abigail Lucky", email: "name@gmail.com", phone: "+12345678901", role: "Designer", team: "Team 1", photo: "/avatar3.jpg" },
  { id: 4, name: "Robert Fox", email: "name@gmail.com", phone: "+12345678901", role: "Designer", team: "Team 1", photo: "/avatar4.jpg" },
];

export default function Employees() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employees</h1>
        <div className="flex space-x-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded-lg w-64"
          />
          {/* Add New Staff Button */}
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg">+ Add New Staff</button>
        </div>
      </div>

      {/* Employee Table */}
      <table className="w-full border-collapse shadow-md bg-white rounded-lg">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="p-4">Photo</th>
            <th className="p-4">Position</th>
            <th className="p-4">Work Email</th>
            <th className="p-4">Phone Number</th>
            <th className="p-4">Role</th>
            <th className="p-4">Team</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id} className="border-t">
              <td className="p-4">
                <img src={employee.photo} alt={employee.name} className="w-10 h-10 rounded-full" />
              </td>
              <td className="p-4">{employee.name}</td>
              <td className="p-4">{employee.email}</td>
              <td className="p-4">{employee.phone}</td>
              <td className="p-4">{employee.role}</td>
              <td className="p-4">{employee.team}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
