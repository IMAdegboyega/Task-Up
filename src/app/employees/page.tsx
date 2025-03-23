"use client";
import { useState } from "react";
import { employees } from "@/lib/data/data";
import FloatWindow from "@/components/floats";
import AddNewStaffForm from "@/lib/data/addNewStaff";

export default function Employees() {
  const [searchQuery, setSearchQuery] = useState("");

  const [isFloatWindowOpen, setIsFloatWindowOpen] = useState(false);

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 bg-white w-full h-full min-h-screen">
      {/* Header */}
      <div className="flex justify-end items-center mb-4">
        <div className="flex space-x-4">
          {/* Add New Staff Button */}
          <button
              onClick={() => setIsFloatWindowOpen(true)}
              className="px-4 py-2 rounded-sm bg-red-600 text-white hover:bg-red-900"
            >
              + ADD NEW STAFF
            </button>
        </div>
      </div>

      {/* Employee Table */}
      <table className="w-full border-collapse bg-white text-black text-lg">
        <thead className="bg-gray-100 rounded-lg">
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

      <FloatWindow isOpen={isFloatWindowOpen} onClose={() => setIsFloatWindowOpen(false)}>
          <h2 className="text-lg font-bold mb-4">Add New Project</h2>
          <AddNewStaffForm onClose={() => setIsFloatWindowOpen(false)} />
      </FloatWindow>

    </div>
  );
}
