import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const tasks = [
  {
    id: "1",
    name: "Reservation Application",
    title: "Pushup Studios",
    createdBy: "Anita Lever (CEO)",
    createdDate: "2021-10-13",
    dueDate: "2021-10-31",
    progress: 60,
    description: "Lorem ipsum dolor sit amet...",
  },
  {
    id: "2",
    name: "E-commerce Platform",
    title: "Tech Innovations",
    createdBy: "John Doe",
    createdDate: "2021-09-10",
    dueDate: "2021-11-15",
    progress: 30,
    description: "This project is focused on...",
  },
];

const ProjectDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);
  const [formattedCreatedDate, setFormattedCreatedDate] = useState("");
  const [formattedDueDate, setFormattedDueDate] = useState("");

  useEffect(() => {
    if (id) {
      const foundProject = tasks.find((task) => task.id === id) || null;
      setProject(foundProject);
      
      // Format dates only after the component has mounted
      if (foundProject) {
        setFormattedCreatedDate(new Date(foundProject.createdDate).toLocaleDateString());
        setFormattedDueDate(new Date(foundProject.dueDate).toLocaleDateString());
      }
    }
  }, [id]);

  if (!project) return <p>Loading...</p>;

  return (
    <div className="p-8 bg-white min-h-screen">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">{project.name} (Project)</h1>
        <p className="text-gray-500">
          Created by {project.createdBy} on {formattedCreatedDate}
        </p>
      </header>

      <div className="flex gap-4 mb-6">
        <button className="px-4 py-2 bg-blue-700 text-white rounded">New Task</button>
        <button className="px-4 py-2 bg-gray-300 text-black rounded">Invite People</button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-gray-600">📅 Date Created: {formattedCreatedDate}</p>
          <p className="text-gray-600">📅 Due Date: {formattedDueDate}</p>
        </div>
        <p className="text-green-600 font-bold">Total Progress: {project.progress}%</p>
      </div>

      <h2 className="text-2xl font-bold">Project Description</h2>
      <p className="text-gray-600">{project.description}</p>
    </div>
  );
};

export default ProjectDetail;
