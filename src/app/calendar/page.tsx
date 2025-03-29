"use client";
import { useState } from "react";
import { Calendar, momentLocalizer, Views, View } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const events = [
  { title: "Release V1", start: new Date(2025, 9, 5), end: new Date(2025, 9, 5), color: "red" },
  { title: "Meeting", start: new Date(2025, 9, 13), end: new Date(2025, 9, 13), color: "blue" },
  { title: "Publish App", start: new Date(2025, 9, 22), end: new Date(2025, 9, 22), color: "yellow" },
];

export default function MyCalendar() {
  const [view, setView] = useState<View>(Views.MONTH); // Explicitly type as View

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Calendar</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Sync with Google</button>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          defaultView={view}
          onView={setView}
        />
      </div>
    </div>
  );
}