"use client";

import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAuth } from "@/store/slices/admin";
import { useRouter } from "next/navigation";

export default function Admin() {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.admin);
  const [error, setError] = useState("");
  const [inputValue, setInput] = useState("");
  const navigate = useRouter();

  const handleRequest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data: any = await dispatch(fetchAuth({ password: inputValue }));
      if (data.error) {
        console.warn(data.error);
        setError("Password incorrect - try again.");
      } else {
        navigate.push("/admin/dashboard");
        setError("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Log in for Admin</h3>
        <form onSubmit={handleRequest}>
          <div className="mt-4">
            <div className="mt-4">
              <label className="block" htmlFor="password">
                Password
              </label>
              <input
                value={inputValue}
                onChange={(e) => setInput(e.target.value)}
                type="password"
                placeholder="********"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              {error && <p className={"text-red-500"}>{error}</p>}
            </div>
            <div className="flex items-baseline justify-between">
              <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                Sign in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
