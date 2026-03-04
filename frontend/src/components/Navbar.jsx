import React from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-gray-900 border-b border-red-700">
      <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-yellow-400 font-mono tracking-tight">
          EVENT MANAGEMENT SYSTEM
        </h1>
        <div>
          <Link
            to="/create"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-yellow-100 px-4 py-2 rounded-xl font-semibold transition"
          >
            <PlusIcon className="size-5" />
            <span>New Event</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar;
