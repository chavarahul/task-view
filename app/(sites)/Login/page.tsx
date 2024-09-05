// pages/index.js
import React from "react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center borders">
      <div className="flex flex-col md:flex-row items-center justify-center borders h-screen w-full bg-white rounded-lg shadow-lg">
        <div className="w-full md:w-1/3 p-4 flex-bet borders h-full">
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 mt-1 border border-gray-300 rounded"
                placeholder="micahcarroll@gmail.com"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 mt-1 border border-gray-300 rounded"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-4">
              <a href="#" className="text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>
            <button className="w-full p-2 bg-black text-white rounded hover:bg-gray-800">
              Sign in
            </button>
            <p className="mt-4">
              No account?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Sign up
              </a>
            </p>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block w-full md:w-[70%] borders h-full p-4">
          <img
            src="/neon-globe.png" // Make sure to replace with the correct path to your image
            alt="Neon Globe"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
