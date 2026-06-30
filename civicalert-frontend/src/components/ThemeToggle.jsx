import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="
        p-2 rounded-lg
        bg-slate-200 dark:bg-slate-700
        text-slate-800 dark:text-white
        transition
      "
    >
      {darkMode ? <Sun size={18}/> : <Moon size={18}/>}
    </button>
  );
}