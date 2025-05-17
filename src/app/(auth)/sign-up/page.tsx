"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingOverlay from "@/components/loadingOverlay";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Signing you up");
  const [loadingStatus, setLoadingStatus] = useState<"loading" | "success" | "error">("loading");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingMessage("Signing you up...");

    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setLoadingStatus("success");
        setLoadingMessage("Signup successful!");
        setTimeout(() => router.push("/"), 1500);
      } else {
        setLoadingStatus("error");
        setLoadingMessage(data.message || "Sign-Up failed! Please try again.");
        setTimeout(() => setIsLoading(false), 2000);
      }
    } catch (error) {
      setLoadingStatus("error");
        setLoadingMessage("An error occurred during Sign-Up. Please try again.");
        setTimeout(() => setIsLoading(false), 2000);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-blue-800">
        <div className="bg-white p-8 rounded-none shadow-none w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
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
              Sign Up
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-600">Already have an account?</p>
            <Link href="/signin" className="text-blue-600 underline hover:text-blue-800">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      <LoadingOverlay isOpen={isLoading} message={loadingMessage} status={loadingStatus} />

    </>
  );
};

export default SignUp;
