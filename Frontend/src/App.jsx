import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

/* Components */
import Homepage from './Homepage/Homepage'
import './App.css'
import Dashboard from './Dashboard/Dashboard'
import Add from './Dashboard/Add/Add'
import Financieel from "./Dashboard/Financieel/Financieel";
import Crediteuren from "./Dashboard/Financieel/Crediteuren/Crediteuren";
import AddCrediteur from "./Dashboard/Financieel/Crediteuren/AddCrediteur/AddCrediteur";
import CrediteurenReview from "./Dashboard/Financieel/Crediteuren/ Crediteuren-review/CrediteurenReview.jsx";

function App() {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Homepage />} />

                [ Dashboard routes ]
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/add" element={<Add />} />
                <Route path="/dashboard/financial" element={<Financieel />} />
                <Route path="/dashboard/crediteuren" element={<Crediteuren />} />
                <Route path={"/dashboard/crediteuren-review"} element={<CrediteurenReview />} />
                <Route path="/dashboard/crediteuren/add" element={<AddCrediteur />} />

            </Routes>
        </main>
        
    )
}

export default App
