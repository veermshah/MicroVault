import React from "react";
import ReactDOM from "react-dom/client";
import { MetaMaskProvider } from "@metamask/sdk-react";
import MetaMaskLogin from "./MetaMaskLogin"; // Adjust the path accordingly

const App = () => {
  return <MetaMaskLogin />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MetaMaskProvider debug={false}>
      <App />
    </MetaMaskProvider>
  </React.StrictMode>
);
