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
import Facturen from "./Dashboard/Financieel/Facturen/Facturen.jsx";
import Postbus from "./Dashboard/Financieel/Facturen/Postbus/Postbus.jsx";
import Beoordelen from "./Dashboard/Financieel/Facturen/Beoordelen/Beoordelen.jsx";
import Archief from "./Dashboard/Financieel/Facturen/Archief/Archief.jsx";
import Afgekeurd from "./Dashboard/Financieel/Facturen/Afgekeurd/Afgekeurd.jsx";

function App() {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Homepage />} />

                [ Dashboard routes ]
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/add" element={<Add />} />

                <Route path="/dashboard/financial" element={<Financieel />} />
                <Route path="/dashboard/financial/crediteuren" element={<Crediteuren />} />
                <Route path={"/dashboard/financial/crediteuren-review"} element={<CrediteurenReview />} />
                <Route path="/dashboard/financial/crediteuren/add" element={<AddCrediteur />} />

                <Route path="/dashboard/financial/facturen" element={<Facturen />} />
                <Route path="/dashboard/financial/facturen/postbus" element={<Postbus />} />
                <Route path="/dashboard/financial/facturen/beoordelen" element={<Beoordelen />} />
                <Route path="/dashboard/financial/facturen/archief" element={<Archief />} />
                <Route path="/dashboard/financial/facturen/afgekeurd" element={<Afgekeurd />} />

            </Routes>
        </main>
        
    )
}

export default App
