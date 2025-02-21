import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-400/10 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
      ) : (
        <Sun className="h-5 w-5 text-primary-400" />
      )}
    </button>
  );
}