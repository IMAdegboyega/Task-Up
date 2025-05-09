"use client";

import { useState } from "react";
import { employees } from "@/lib/data/data";
import FloatWindow from "@/components/floats";
import AddNewStaffForm from "@/lib/data/addNewStaff";

// Define a TypeScript type for an employee
type Employee = {
  id: number;
  name: string;
  photo: string;
  email: string;
  phone: string;
  role: string;
  team: string;
};

export default function EmployeesPage() {
  // State for search query input (for filtering)
  const [searchQuery, setSearchQuery] = useState<string>("");

  // State to control the "Add New Staff" floating window
  const [isFloatWindowOpen, setIsFloatWindowOpen] = useState<boolean>(false);

  // Filter the employees based on the search input
  const filteredEmployees: Employee[] = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 bg-white w-full min-h-screen">
      {/* Header section with Add button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Employee Directory</h1>

        {/* Optional search input */}
        {/* <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name"
          className="border px-4 py-2 rounded shadow-sm"
        /> */}

        {/* Button to open Add New Staff form */}
        <button
          onClick={() => setIsFloatWindowOpen(true)}
          className="px-4 py-2 rounded-sm bg-red-600 text-white hover:bg-red-900"
        >
          + ADD NEW STAFF
        </button>
      </div>

      {/* Table displaying the filtered employee list */}
      <table className="w-full border-collapse bg-white text-lg text-black">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="p-4">Photo</th>
            <th className="p-4">Name</th>
            <th className="p-4">Work Email</th>
            <th className="p-4">Phone Number</th>
            <th className="p-4">Role</th>
            <th className="p-4">Team</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee: Employee) => (
              <tr key={employee.id} className="border-t">
                <td className="p-4">
                  <img
                    src={employee.photo}
                    alt={employee.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="p-4">{employee.name}</td>
                <td className="p-4">{employee.email}</td>
                <td className="p-4">{employee.phone}</td>
                <td className="p-4">{employee.role}</td>
                <td className="p-4">{employee.team}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Floating window to add new staff member */}
      <FloatWindow isOpen={isFloatWindowOpen} onClose={() => setIsFloatWindowOpen(false)}>
        <h2 className="text-lg font-bold mb-4">Add New Staff</h2>
        <AddNewStaffForm onClose={() => setIsFloatWindowOpen(false)} />
      </FloatWindow>
    </div>
  );
}
