// ToggleThemeButton.jsx
"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react"; // تأكد إن المكتبة متسطبة: npm install lucide-react

export default function ToggleThemeButton() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
    setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        marginTop: "10px",
        padding: "6px 12px",
        borderRadius: "6px",
        cursor: "pointer",
        background: "var(--theme-color)",
        color: "var(--theme-text)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        border: "none",
      }}
    >
      {theme === "light" ? (
        <>
          <Moon size={18} />
          الوضع الليلي
        </>
      ) : (
        <>
          <Sun size={18} />
          الوضع النهاري
        </>
      )}
    </button>
  );
}
