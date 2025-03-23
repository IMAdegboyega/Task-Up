// import { notFound } from "next/navigation";
// import { tasks } from "@/lib/data/data";
// import { FaUsers, FaCommentDots } from "react-icons/fa";
// import BlueButton from "@/components/BlueButton";
// import ProgressBar from "@/components/ProgressBar";

// export default function ProjectDetail({ params }: { params: { id: string } }) {
//   const project = tasks.find((task) => String(task.id) === String(params.id));

//   if (!project) return notFound();

//   return (
//     <div className="min-h-screen bg-green-500 py-10 px-6">
//       {/* Project Container */}
//       <div className="max-w-4xl mx-auto bg-gray-200 p-8 rounded-lg shadow-none">
//         {/* Header */}
//         <header className="mb-6 border-b pb-4">
//           <h1 className="text-3xl font-bold">{project.name} (Project)</h1>
//           <p className="text-gray-500 mt-2">
//             Created by <span className="font-medium">{project.createdBy}</span> on {" "}
//             {new Date(project.createdDate).toLocaleDateString()}
//           </p>
//         </header>

//         {/* Buttons */}
//         {/* <div className="flex items-center gap-4 mb-6">
//           <BlueButton>New Task</BlueButton>
//           <BlueButton className="bg-gray-200 text-gray-800 flex items-center gap-2">
//             <FaUsers className="text-gray-600" /> Invite People
//           </BlueButton>
//           <BlueButton className="bg-white border border-gray-300 text-gray-800 flex items-center gap-2">
//             <FaCommentDots className="text-blue-500" /> 45 Comments
//           </BlueButton>
//         </div> */}

//         {/* Project Info */}
//         <div className="grid grid-cols-3 gap-6 items-center mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
//           <div>
//             <p className="text-sm text-gray-500">📅 Date Created</p>
//             <p className="text-gray-800 font-medium">
//               {new Date(project.createdDate).toLocaleDateString()}
//             </p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">📅 Due Date</p>
//             <p className="text-gray-800 font-medium">
//               {new Date(project.dueDate).toLocaleDateString()}
//             </p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">📊 Total Progress</p>
//             <ProgressBar progress={project.progress} />
//             <p className="text-gray-800 font-medium mt-1">{project.progress}%</p>
//           </div>
//         </div>

//         {/* Project Description */}
//         <h2 className="text-2xl font-bold mb-3">Project Description</h2>
//         <p className="text-gray-600 leading-relaxed">{project.description}</p>
//       </div>
//     </div>
//   );
// }
