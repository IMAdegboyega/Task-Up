"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save access and refresh tokens to localStorage
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        router.push("/"); // Redirect to home page
      } else {
        alert(data.message || "Sign-In failed! Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-800">
      <div className="bg-white p-8 rounded-none shadow-none w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <Link href="/sign-up" className="text-blue-600 underline hover:text-blue-800">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
