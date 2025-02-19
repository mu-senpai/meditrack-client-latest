import { FaHome } from "react-icons/fa";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center gap-8 p-8">
        <h2 className="text-9xl font-extrabold text-accent">{error.status || 404}</h2>
        <p className="text-2xl md:text-3xl text-gray-400 font-semibold">{error.statusText || "Page Not Found"}</p>
        <p className="text-lg text-gray-400">
          {error.message || "Something went wrong!"}
        </p>
        <Link
          to="/"
        >
          <button className="btn border-none bg-accent text-white flex items-center justify-center gap-2">
            <FaHome size={20} />
            <span>Back to Home</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
