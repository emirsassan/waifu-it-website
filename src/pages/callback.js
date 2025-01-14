import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ErrorPage from "./error"; // Update the import path
import { FaSpinner } from "react-icons/fa"; // Import a loading spinner icon (you may need to install the icon package)

const Callback = () => {
  const router = useRouter();
  const { code } = router.query;
  const [errorMessage, setErrorMessage] = useState("");
  const [authInProgress, setAuthInProgress] = useState(true);
  const [showErrorPage, setShowErrorPage] = useState(false);
  const [theme, setTheme] = useState("dark"); // Default to light theme

  useEffect(() => {
    if (code) {
      axios
        .post("/api/auth/discord", { code })
        .then((response) => {
          const { access_token } = response.data;

          Cookies.set("access_token", access_token, { expires: 1 });
          router.push("/dashboard");
        })
        .catch((error) => {
          setErrorMessage("An error occurred during authentication.");
          setTimeout(() => {
            setAuthInProgress(false);
            setShowErrorPage(true);
          }, 1000);
        });
    }
  }, [code, router]);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {authInProgress ? (
        <div className="flex flex-col items-center">
          <p className="text-lg mb-6">Authentication in progress...</p>
          <FaSpinner className="animate-spin text-blue-500 text-xl" />{" "}
          {/* Loading spinner */}
        </div>
      ) : (
        showErrorPage && <ErrorPage message={errorMessage} />
      )}
    </div>
  );
};

export default Callback;
