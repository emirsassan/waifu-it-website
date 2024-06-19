import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ErrorPage = ({ message }) => {
  const [theme, setTheme] = useState("dark"); // Default to light theme

  useEffect(() => {
    // Display toast notification when component mounts
    const toastId = toast.error('Click "Re-authenticate" to continue.', {
      autoClose: 3000,
    });

    return () => {
      // Clear the initial toast notification when the component unmounts
      toast.dismiss(toastId);
    };
  }, []);

  const handleReauthClick = () => {
    toast.info("Re-authenticating...", {
      autoClose: 2000,
    });

    setTimeout(() => {
      // Redirect to the dashboard page after waiting
      window.location.href = "/dashboard";
    }, 3000);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen  ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <p className="text-lg mb-6">{message}</p>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleReauthClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
        >
          Re-authenticate
        </button>
        <Link
          href="/"
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md transition duration-300"
        >
          Home
        </Link>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme={theme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

export default ErrorPage;
