import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { FaSun, FaMoon } from 'react-icons/fa'
const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={handleToggleTheme}
      className="fixed bottom-4 right-4 p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition duration-300"
    >
      {theme === "dark" ? <FaSun size={24} /> : <FaMoon size={24} />}
    </button>
  );
};

export default ThemeSwitch;
