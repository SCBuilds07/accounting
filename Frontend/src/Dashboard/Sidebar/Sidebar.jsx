import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import './Sidebar.scss'

export default function Sidebar() {
    const navigate = useNavigate();

    const [activeSidebar, setActiveSidebar] = useState("Deactivated")

    function handleClickSidebar() {
        if (activeSidebar == "Deactivated") {
            setActiveSidebar("Activated")
        } else if (activeSidebar == "Activated") {
            setActiveSidebar("Deactivated")
        }
    }

    return (
        <div className="sidebar" id={activeSidebar}>
                <button onClick={() => handleClickSidebar()}>{activeSidebar == "Activated" ? "X" : ">" }</button>
                    {activeSidebar == "Activated" && (
                        <div className='sidebar-content'>
                            <ul>
                                <li onClick={() => navigate("/dashboard/financial")}>Financieel</li>
                                <li>Andere shit</li>
                                <li>Andere shit 2</li>
                                <li onClick={() => (window.location.href = "https://www.justice.gov/epstein")}>Epstein files</li>
                            </ul>
                        </div> 
                    )}
            </div>
    )
}