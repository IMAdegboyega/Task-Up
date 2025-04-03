// AddNewProjectForm.tsx
import React, { useState } from "react";

const AddNewStaffForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    workersName: "",
    workEmail: "",
    phoneNumber: "",
    role: "",
    team: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New Project:", formData);
    onClose(); // Close after submitting
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Project Name */}
      <div>
        <label className="block text-md font-medium text-black">Worker's Name</label>
        <input
          type="text"
          name="workersName"
          value={formData.workersName}
          onChange={handleChange}
          placeholder="Enter Employees Name"
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-800 focus:border-red-800 sm:text-sm p-2"
        />
      </div>

      {/* Created By */}
      <div>
        <label className="block text-md font-medium text-black">Work Email</label>
        <input
          type="text"
          name="workEmail"
          value={formData.workEmail}
          onChange={handleChange}
          placeholder="Enter Employees Email"
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-800 focus:border-red-800 sm:text-sm p-2"
        />
      </div>

      {/* Due Date */}
      <div>
        <label className="block text-md font-medium text-black">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter Employees Phone Number"
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-800 focus:border-red-800 sm:text-sm p-2"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-md font-medium text-black">Role</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Enter Employees Role"
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-800 focus:border-red-800 sm:text-sm p-2"
        />
      </div>

      <div>
        <label className="block text-md font-medium text-black">Team</label>
        <input
          name="team"
          value={formData.team}
          onChange={handleChange}
          placeholder="Enter project Team"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-800 focus:border-red-800 sm:text-sm p-2"
        />
      </div>

      {/* Submit Button */}
      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddNewStaffForm;


