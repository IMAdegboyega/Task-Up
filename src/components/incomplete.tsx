"use client";
import React, { useEffect, useState } from "react";

const IncompleteProjectSummary = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchIncomplete = async () => {
      const res = await fetch("/api/projects/incomplete");
      const data = await res.json();
      setCount(data.projects.length);
    };

    fetchIncomplete();
  }, []);

  return (
    <p className="text-lg font-semibold mt-4">
      {count !== null
        ? `You have ${count} project${count === 1 ? "" : "s"} that are not completed.`
        : "Loading..."}
    </p>
  );
};

export default IncompleteProjectSummary;

