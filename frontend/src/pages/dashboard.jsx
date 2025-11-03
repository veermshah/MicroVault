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
  const [mobileOpen, setMobileOpen] = useState(false); // mobile drawer

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
      <div className="max-w-[1248px] w-full mx-auto pt-[16px] px-4">
        {/* Mobile: hamburger */}
        <div className="flex items-center justify-between md:hidden mb-4">
          <div className="flex items-center">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open sidebar"
              className="p-2 rounded-md bg-gray-100 mr-2"
            >
              ☰
            </button>
            <h2 className="text-lg font-semibold">Dashboard</h2>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="bg-transparent rounded-full p-2 hidden md:inline-flex"
              style={{ width: "40px", height: "40px" }}
            >
              {isCollapsed ? "+" : "-"}
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row h-full relative z-10">
          {/* Sidebar column: behaves like drawer on mobile */}
          <div
            className={`transition-all duration-300 md:pr-4 md:block ${
              isCollapsed ? "md:w-0" : "md:w-1/6"
            }`}
          >
            {/* Desktop collapse/expand control */}
            <div className="hidden md:flex justify-end mb-2">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={`bg-transparent rounded-full p-2`}
                style={{ width: "40px", height: "40px" }}
              >
                {isCollapsed ? "+" : "-"}
              </button>
            </div>

            {/* Desktop sidebar */}
            {!isCollapsed && (
              <div className="hidden md:block">
                <DashboardSidebar
                  activeComponent={activeComponent}
                  setActiveComponent={setActiveComponent}
                />
              </div>
            )}

            {/* Mobile drawer - positioned and controlled via css .sidebar.open */}
            <div className={`md:hidden ${mobileOpen ? 'sidebar open' : 'sidebar'}`}>
              {mobileOpen && (
                <DashboardSidebar
                  activeComponent={activeComponent}
                  setActiveComponent={setActiveComponent}
                  onClose={() => setMobileOpen(false)}
                />
              )}
            </div>
          </div>

          {/* Main content: full width on mobile, remaining on desktop */}
          <div className={`transition-all duration-300 ${isCollapsed ? 'w-full' : 'w-full md:w-[87%]'}`}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;