import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const EventNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-900 via-red-800 to-orange-600">
      <div className="bg-gray-900/20 rounded-full p-10 shadow-lg border border-red-700">
        <NotebookIcon className="size-12 text-yellow-400" />
      </div>

      <h3 className="text-3xl font-bold text-yellow-300 mt-6">
        No events!
      </h3>
      <p className="text-yellow-100 text-center max-w-md mt-2">
        Ready to add events? Start by creating your event in the Event Hub.
      </p>

      <Link
        to="/create"
        className="mt-6 bg-red-600 hover:bg-red-500 text-yellow-100 px-6 py-2 rounded-xl font-semibold transition flex items-center justify-center gap-2"
      >
        Add Event
      </Link>
    </div>
  );
};

export default EventNotFound;
