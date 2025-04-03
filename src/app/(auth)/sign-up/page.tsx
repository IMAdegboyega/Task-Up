"use client";

import Link from "next/link";
import { useState } from "react";

const SignUp = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign-up:", { FirstName,LastName, email, password });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-800">
      <div className="bg-white p-8 rounded-none shadow-none w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p>First Name</p>
          <input
            type="FirstName"
            placeholder="Enter Your First Name"
            value={FirstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <p>Last Name</p>
          <input
            type="LastName"
            placeholder="Enter Your Last Name"
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <p>Email</p>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <p>Password</p>
          <input
            type="password"
            placeholder="Create Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-800 text-white p-2 rounded hover:bg-blue-900 transition duration-300">
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">Already have an account?</p>
          <Link href="/sign-in" className="text-blue-600 underline hover:text-blue-800">
            Sign In
          </Link>
      </div>
      </div>
    </div>
  );
};

export default SignUp;
