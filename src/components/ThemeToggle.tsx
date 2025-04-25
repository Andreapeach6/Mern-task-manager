import React, { useState, useEffect } from 'react';
import './ThemeToggle.css'  // Ensure app.css is imported for theme styles

// Function to get the current theme from localStorage or default to light theme
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme ? savedTheme : 'light'; // Default to 'light' theme
};

const ThemeToggle: React.FC = () => {
  // State to keep track of the current theme
  const [theme, setTheme] = useState<string>(getInitialTheme);

  // Effect to apply the theme when it changes
  useEffect(() => {
    // Apply the theme to the body element
    document.body.setAttribute('data-theme', theme);
    // Save the selected theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle between 'light' and 'dark' themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button onClick={toggleTheme} className="theme-toggle-btn">
      {theme === 'light' ? '🌙 Dark Mode' : '🌞 Light Mode'}
    </button>
  );
};

export default ThemeToggle;
