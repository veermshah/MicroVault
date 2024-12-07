import React, { useState, useEffect } from "react";
import DashboardSidebar from "../components/dashboardSidebar";
import DashboardHome from "../components/dashboardHome";
import Lend from "../components/lend";
import Borrow from "../components/borrow";
import MyWallet from "../components/myWallet";
import MetaMaskLogin from "../components/MetaMaskLogin";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("home"); // Default to "home"
  const [isCollapsed, setIsCollapsed] = useState(false); // State for sidebar visibility

  useEffect(() => {
    console.log("Active component changed to:", activeComponent);
  }, [activeComponent]);

  const renderContent = () => {
    console.log("Rendering content for:", activeComponent);
    switch (activeComponent) {
      case "home":
        return <DashboardHome setActiveComponent={setActiveComponent} />; // Pass setActiveComponent as a prop
      case "lend":
        return <Lend />;
      case "borrow":
        return <Borrow />;
      case "login":
        return <MetaMaskLogin />;
      case "myWallet":
        console.log("Attempting to render MyWallet component");
        return <MyWallet />;
      default:
        console.log("Default case: rendering DashboardHome component");
        return <DashboardHome setActiveComponent={setActiveComponent} />; // Pass setActiveComponent as a prop
    }
  };

  return (
    <div className="bg-white min-h-screen overflow-visible">
      {/* Ensure overflow-visible */}
      <div className="max-w-[1248px] w-full mx-auto pt-[30px]">
        <div className="flex flex-row h-full relative z-10">
          <div
            className={`transition-all duration-300 ${
              isCollapsed ? "w-0" : "w-1/6"
            } pr-4`}
          >
            {/* Minimize/Expand Button */}
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={`bg-transparent rounded-full p-2`}
                style={{ width: "40px", height: "40px" }}
              >
                {isCollapsed ? "+" : "-"}
              </button>
            </div>
            {!isCollapsed && (
              <DashboardSidebar
                activeComponent={activeComponent}
                setActiveComponent={setActiveComponent}
              />
            )}
          </div>
          <div
            className={`transition-all duration-300 ${
              isCollapsed ? "w-full" : "w-[87%]"
            }`}
          >
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;