import { createRoot } from "react-dom/client";
import App from "./App.standalone";
import "./index.css";
import { ThemeProvider } from "next-themes";

// Static frontend-only version without any backend dependencies

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark">
    <App />
  </ThemeProvider>
);