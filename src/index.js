import React from "react";
import ReactDOMClient from "react-dom/client";
import "./index.scss";
import App from "./components/app/App";

const root = ReactDOMClient.createRoot(document.getElementById("root"));

root.render(<App></App>);
