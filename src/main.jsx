import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import "./buttons.scss";
import "./competition.scss";
import "./sections.scss";
import "./animations.scss";
import "./common.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  // </React.StrictMode>
);
