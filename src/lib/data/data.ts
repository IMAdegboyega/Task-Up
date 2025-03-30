export const tasks = [
  {
    id: "1",
    name: "Reservation Application integrated with Desktop App",
    title: "Pushup Studios",
    userImage: "/path/to/image1.jpg",
    userName: "Abigail Lucky",
    userRole: "Team Lead",
    tags: ["DESKTOP APP"],
    progress: 60,
    tasksDone: 12,
    dueDate: "12/05/2020",
    status: "In Progress",
    description: "This is a description of the project, and it is done. Yay! 🎉.",
    createdBy: "Jane Smith", // Add creator name
    createdDate: new Date().toISOString(), // Add creation date
  },
  {
    id: "2",
    name: "Reservation Application integrated with Google Maps",
    title: "Tech Innovations",
    userImage: "/path/to/image2.jpg",
    userName: "John Doe",
    userRole: "Developer",
    tags: ["WEB APP"],
    progress: 12,
    tasksDone: 15,
    dueDate: "15/06/2020",
    status: "Important",
    description: "This is a description of the project, and it is done. Yay! 🎉.",
    createdBy: "Jane Smith", // Add creator name
    createdDate: new Date().toISOString(), // Add creation date
  },
  {
    id: "3",
    name: "E-commerce Website with Payment Gateway",
    title: "Tech Innovations",
    userImage: "/path/to/image2.jpg",
    userName: "John Doe",
    userRole: "Developer",
    tags: ["WEB APP"],
    progress: 100,
    tasksDone: 15,
    dueDate: "15/06/2020",
    status: "Done",
    description: "This is a description of the project, and it is done. Yay! 🎉.",
    createdBy: "Jane Smith", // Add creator name
    createdDate: new Date().toISOString(), // Add creation date
  },
];
export const employees = [
  { id: 1, name: "Esther Howard", email: "name@gmail.com", phone: "+12345678901", role: "Developer", team: "Team 1", photo: "/avatar1.jpg" },
  { id: 2, name: "Wade Warren", email: "name@gmail.com", phone: "+12345678901", role: "Designer", team: "Team 1", photo: "/avatar2.jpg" },
  { id: 3, name: "Abigail Lucky", email: "name@gmail.com", phone: "+12345678901", role: "Designer", team: "Team 1", photo: "/avatar3.jpg" },
  { id: 4, name: "Robert Fox", email: "name@gmail.com", phone: "+12345678901", role: "Designer", team: "Team 1", photo: "/avatar4.jpg" },
];

export const stats = [
  { title: "Finished Projects", value: 150, color: "text-green-500" },
  { title: "Finished Tasks", value: 300, color: "text-yellow-500" },
  { title: "Delays", value: 5, color: "text-red-500" },
  { title: "Total Clients", value: 562, trend: "-2%", trendColor: "text-red-500" },
  { title: "New Projects", value: 892, trend: "+10%", trendColor: "text-green-500" },
];

export const weeklyPerformance = [
    { day: "M", value: 80, color: "bg-sky-500" },
    { day: "T", value: 40, color: "bg-sky-500" },
    { day: "W", value: 60, color: "bg-sky-500" },
    { day: "T", value: 40, color: "bg-sky-500" },
    { day: "F", value: 90, color: "bg-sky-500" },
  ];

export const departmentPerformance = [
  { name: "Design", value: 90, color: "bg-red-500" },
  { name: "Development", value: 80, color: "bg-blue-500" },
  { name: "Marketing", value: 60, color: "bg-indigo-500" },
  { name: "Advertising", value: 40, color: "bg-green-500" },
];

export const notificationTasks = [
  {
    name: "Reservation Application Integrated with Desktop App",
    teamLead: "Adams Evans",
    status: "In Progress",
    created: "11-10-2021",
    expires: "30 days",
  },
  {
    name: "Reservation Application Integrated with Desktop App",
    teamLead: "Adams Evans",
    status: "Stuck",
    created: "15-10-2021",
    expires: "12 hours",
  },
  {
    name: "Reservation Application Integrated with Desktop App",
    teamLead: "Adams Evans",
    status: "Paused",
    created: "20-09-2021",
    expires: "In 10 mins",
  },
  {
    name: "Reservation Application Integrated with Desktop App",
    teamLead: "Adams Evans",
    status: "Completed",
    created: "15-09-2021",
    expires: "0 mins",
  },
];

export const notificationUpdates = [
  {
    text: "A new project has been created (Reservation Application Integrated with Desktop App - PushUp Studios)",
    link: "#",
  },
  {
    text: "A new project has been created (Reservation Application Integrated with Desktop App - PushUp Studios)",
    link: "#",
  },
  {
    text: "A new project has been created (Reservation Application Integrated with Desktop App - PushUp Studios)",
    link: "#",
  },
];

