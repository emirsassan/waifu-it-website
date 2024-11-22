import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "./components/LoadingSpinner";
import generateToken from "../utils/generateToken";
import { FaSun, FaMoon } from "react-icons/fa";
import ThemeSwitch from "./components/ThemeSwitch";

const Dashboard = () => {
  const router = useRouter();
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState(null);
  const [randomToken, setRandomToken] = useState("");
  const [showToken, setShowToken] = useState(true);
  const [fetched, setFetched] = useState(false); // Add fetched state

  const tokenInputRef = useRef(null);

  const handleToggleShowToken = useCallback(() => {
    setShowToken((prevShowToken) => !prevShowToken);
  }, []);

  useEffect(() => {
    // Check if the user has a valid access token
    const accessToken = Cookies.get("access_token");
    if (!accessToken) {
      // Redirect the user to the Discord OAuth login page
      router.push(
        `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URL}&response_type=code&scope=identify%20email%20guilds.members.read%20guilds.join%20guilds`
      );
      return;
    }

    // The user has a valid access token, fetch user details
    const fetchDiscordUserDetails = async () => {
      try {
        const response = await axios.get("https://discord.com/api/users/@me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
        // Call fetchUserDetails here after userData is set
        fetchUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details");
        // Handle error, like clearing invalid tokens from cookies and local storage
        Cookies.remove("access_token");
        localStorage.removeItem("showToken");
        router.push(
          `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URL}&response_type=code&scope=identify%20email%20guilds.members.read%20guilds.join%20guilds`
        );
      }
    };

    // Fetch user details function
    const fetchUserDetails = async (userData) => {
      if (!userData) {
        return; // Exit early if userData is undefined
      }
      const response = await axios.post(
        "/api/auth/user", // Send the request to the server-side API route
        {
          id: userData.id,
          email: userData.email,
          access_token: accessToken,
        }
      );

      setRandomToken(response.data);
      setFetched(true); // Mark user details as fetched
    };

    // Call the function to fetch user details
    fetchDiscordUserDetails();
    handleToggleShowToken(); // Initially show the token

    const storedShowToken = localStorage.getItem("showToken");
    if (storedShowToken !== null) {
      setShowToken(JSON.parse(storedShowToken));
    } else {
      // If showToken is not stored, set it to true in localStorage
      localStorage.setItem("showToken", JSON.stringify(false));
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleToggleShowToken, router]);

  const handleBeforeUnload = () => {
    localStorage.removeItem("showToken");
  };

  const handleLogout = () => {
    Cookies.remove("access_token");
    localStorage.removeItem("showToken");
    router.push("/");
  };

  const handleRegenerateToken = async () => {
    try {
      // Check if the rate limit has been exceeded on the client-side
      const lastRegenTime = parseInt(
        localStorage.getItem("last_regen_time") || "0",
        10
      );
      const currentTime = Date.now();
      const timeDifference = currentTime - lastRegenTime;
      const minInterval = 30 * 1000; // 2 times per minute (2 * 60 * 1000 ms)

      if (timeDifference < minInterval) {
        const remainingTime = (minInterval - timeDifference) / 1000;
        throw new Error(
          `Rate limit exceeded. Please wait ${remainingTime.toFixed(
            0
          )} seconds before regenerating the token again.`
        );
      }

      const accessToken = Cookies.get("access_token");
      if (!accessToken) {
        throw new Error("Access token not found.");
      }

      const newToken = generateToken(user.id, process.env.HMAC_KEY);

      // Send the new token to the server to save it, similar to the original logic
      const response = await axios.post("/api/auth/user", {
        id: user.id,
        token: newToken,
      });

      setRandomToken(newToken);
      setShowToken(true);

      // Update the last regeneration time on the client-side
      localStorage.setItem("last_regen_time", currentTime.toString());

      toast.info("Successfully regenerated!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

      console.log("POST request response:", response.data);
    } catch (error) {
      if (error.message.startsWith("Rate limit exceeded")) {
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        console.error("Error regenerating token");
        toast.error("Error regenerating token.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(randomToken);
    toast.success("Token copied to clipboard!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const getEyeIcon = () => {
    return showToken ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-6 text-text"
      >
        <path d="m15 18-.722-3.25" />
        <path d="M2 8a10.645 10.645 0 0 0 20 0" />
        <path d="m20 15-1.726-2.05" />
        <path d="m4 15 1.726-2.05" />
        <path d="m9 18 .722-3.25" />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-6 text-text"
      >
        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  };

  const handleScroll = (event) => {
    event.preventDefault();
    const { deltaY } = event;
    const inputElement = tokenInputRef.current;
    const maxScrollTop = inputElement.scrollHeight - inputElement.clientHeight;
    const newScrollTop = inputElement.scrollTop + deltaY;

    if (newScrollTop >= maxScrollTop) {
      setShowToken(false);
    } else if (newScrollTop <= 0) {
      setShowToken(true);
    }
  };

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogoutClick = (e) => {
    e.stopPropagation();
    handleLogout();
  };

  return (
    <div
      className="min-h-screen bg-background text-text dark:bg-dark-background dark:text-dark-text"
    >
      <ToastContainer
        theme={theme === "dark" ? "dark" : "light"} // Adjust theme based on your application's theme state
      />
      {!fetched ? (
        <div className="flex flex-grow items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div
            className={`bg-gradient-to-r text-text p-4 font-sans`}
          >
            <nav className="max-w-screen-lg mx-auto flex flex-col md:flex-row items-center justify-between">
              <div className="text-white font-extrabold text-3xl mb-4 md:mb-0">
                Dashboard
              </div>
              <div className="space-x-4 flex items-center relative">
                <button
                  onClick={() => router.push("/")}
                  className="nav-button font-semibold text-sm uppercase tracking-wide hover:text-blue-200 transition duration-300"
                >
                  Home
                </button>
                <button
                  onClick={() => router.push("https://docs.waifu.it")}
                  className="nav-button font-semibold text-sm uppercase tracking-wide hover:text-blue-200 transition duration-300"
                >
                  Documentation
                </button>
                <div className="flex items-center space-x-4">
                  <Image
                    src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                    alt={user.username}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full cursor-pointer border-2 border-white"
                  />
                  <button
                    onClick={handleLogoutClick}
                    className={`nav-button font-semibold text-sm uppercase tracking-wide ${
                      theme === "dark"
                        ? "text-red-500 hover:text-red-600"
                        : "text-white-900 hover:text-blue-200"
                    } transition duration-300`}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </nav>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className={`p-6 rounded-lg shadow-lg`}>
                <h2 className="text-xl font-bold mb-4">API Statistics</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Requests Today</span>
                    <span className="font-semibold">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Rate Limit</span>
                    <span className="font-semibold">100/500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Status</span>
                    <span className="text-green-500 font-semibold">Active</span>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-lg shadow-lg lg:col-span-2`}>
                <h2 className="text-xl font-bold mb-4">API Token</h2>

                <div className={`mb-6 p-4 rounded-lg dark:bg-red-900/30 bg-red-50 border dark:border-red-800 border-red-200`}>
                  <h3 className="text-red-600 dark:text-red-400 font-semibold mb-2">
                    ⚠️ Security Notice
                  </h3>
                  <p className={`text-sm dark:text-red-400 text-red-700`}>
                    Keep this token secret! Never share it or commit it to version control.
                    If compromised, regenerate immediately. This token grants access to the API on your behalf.
                  </p>
                </div>

                {randomToken && (
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        ref={tokenInputRef}
                        type={showToken ? "text" : "password"}
                        value={randomToken}
                        readOnly
                        className={`w-full px-3 py-2 pr-10 rounded-md text-text dark:bg-background dark:border-none border border-gray-300`}
                      />
                      <div
                        className="absolute top-0 right-0 bottom-0 flex items-center px-3 cursor-pointer"
                        onClick={handleToggleShowToken}
                      >
                        {getEyeIcon()}
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={handleCopyToken}
                        className="flex-1 py-2 px-4 rounded-md bg-accent dark:bg-dark-secondary transition duration-300 text-dark-text"
                      >
                        Copy Token
                      </button>
                      <button
                        onClick={handleRegenerateToken}
                        className="flex-1 py-2 px-4 rounded-md bg-secondary dark:bg-dark-accent transition duration-300 text-text dark:text-dark-text"
                      >
                        Regenerate Token
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* <button
            onClick={handleToggleTheme}
            className="fixed bottom-4 right-4 p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition duration-300"
          >
            {theme === "dark" ? <FaSun size={24} /> : <FaMoon size={24} />}
          </button> */}
          <ThemeSwitch />
        </>
      )}
    </div>
  );
};

export default Dashboard;
