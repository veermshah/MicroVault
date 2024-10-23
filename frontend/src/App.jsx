// src/App.js

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import FAQ from "./pages/faq";

function App() {
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen overflow-x-hidden">
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/faq" element={<FAQ />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;