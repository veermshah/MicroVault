import React, { useState } from "react";
import Trading from "../components/trading";
import Lend from "../components/lend";
import Borrow from "../components/borrow";
import MyWallet from "../components/myWallet";
import MetaMaskLogin from "../components/MetaMaskLogin";

const Dashboard = ({ isLoggedIn, userAddress, onLogin, onLogout }) => {
  const [activeComponent, setActiveComponent] = useState("trading");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left-side menu */}
      <div className="w-[13%] bg-white shadow-md flex flex-col">
        <nav className="flex-grow">
          <ul className="py-4">
            {["trading", "lend", "borrow", "myWallet"].map((item) => (
              <li
                key={item}
                className={`px-4 py-3 hover:bg-gray-100 cursor-pointer ${
                  activeComponent === item ? "bg-gray-200" : ""
                }`}
                onClick={() => setActiveComponent(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-4 py-4">
          {isLoggedIn ? (
            <button
              className="button bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={onLogout}
            >
              Sign Out
            </button>
          ) : (
            <button
              className="button bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => setActiveComponent("login")}
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Right-side content */}
      <div className="w-[87%] p-8 overflow-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          {activeComponent === "trading" && <Trading />}
          {activeComponent === "lend" && <Lend />}
          {activeComponent === "borrow" && <Borrow />}
          {activeComponent === "myWallet" && <MyWallet />}
          {activeComponent === "login" && <MetaMaskLogin onLogin={onLogin} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;