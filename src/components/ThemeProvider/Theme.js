import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({
  children,
  initialTheme = "light",
  customTheme = null // Accept custom theme as a prop
}) => {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    if (customTheme) {
      applyCustomTheme(customTheme);
    } else {
      document.documentElement.setAttribute("data-theme", initialTheme);
    }
  }, [initialTheme, customTheme]);

  const switchTheme = (newTheme) => {
    setTheme(newTheme);
    if (newTheme === "custom" && customTheme) {
      applyCustomTheme(customTheme);
    } else {
      document.documentElement.setAttribute("data-theme", newTheme);
    }
  };

  const applyCustomTheme = (themeObj) => {
    Object.keys(themeObj).forEach((key) => {
      document.documentElement.style.setProperty(`--${key}`, themeObj[key]);
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
