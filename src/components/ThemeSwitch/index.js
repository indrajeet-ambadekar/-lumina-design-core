import React from "react";
import { useTheme } from "../ThemeProvider/Theme";

const ThemeSwitch = () => {
  const { theme, switchTheme } = useTheme();

  const handleChange = (event) => {
    switchTheme(event.target.value);
  };

  return (
    <select value={theme} onChange={handleChange}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="orange">Orange</option>
      <option value="cyan">Cyan</option>
    </select>
  );
};

export default ThemeSwitch;
