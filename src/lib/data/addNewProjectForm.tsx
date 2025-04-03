// AddNewProjectForm.tsx
import React, { useState } from "react";

const AddNewProjectForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    projectName: "",
    createdBy: "",
    dueDate: "",
    description: "",
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
        <label className="block text-sm font-medium text-gray-700">Project Name</label>
        <input
          type="text"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
          placeholder="Enter project name"
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-800 focus:border-red-800 sm:text-sm p-2"
        />
      </div>

      {/* Created By */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Created By</label>
        <input
          type="text"
          name="createdBy"
          value={formData.createdBy}
          onChange={handleChange}
          placeholder="Enter creator's name"
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-800 focus:border-red-800 sm:text-sm p-2"
        />
      </div>

      {/* Due Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-800 focus:border-red-800 sm:text-sm p-2"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter project description"
          rows={4}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-800 focus:border-red-800 sm:text-sm p-2"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-950"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddNewProjectForm;

