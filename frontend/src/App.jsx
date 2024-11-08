// src/App.js

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import FAQ from "./pages/faq";
import MetaMaskLogin from "./pages/login"
import { TransactionProvider } from "./components/transactions"
import MyWallet from "./components/myWallet";
import { UserProvider } from "./components/users";
import GetStarted from "./pages/getStarted"; // Import with lowercase 'g'

function App() {
  return (
    <UserProvider>
      <TransactionProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/login" element={<MetaMaskLogin />} />
                <Route path="/myWallet/:userAddress" element={<MyWallet />} />
                <Route path="/get-started" element={<GetStarted />} /> {/* Use GetStarted with lowercase 'g' */}
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TransactionProvider>
    </UserProvider>
  );
}

export default App;