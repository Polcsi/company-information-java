import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
/* import style sheets */
import "./style/index.css";
import "./style/customSelect.css";
import "./style/topScrollButton.css";
import "./style/homeButton.css";
import "./style/mainPage.css";
import "./style/companiesPage.css";
import "./style/loading.css";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import { GlobalContextProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </React.StrictMode>
);
