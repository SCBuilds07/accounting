import {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { fetchAccountInformation } from "../../api/authAPI.jsx";

import './Sidebar.scss'

export default function Sidebar() {
    const navigate = useNavigate();

    const [accountInformation, setAccountInformation] = useState([])
    const [activeSidebar, setActiveSidebar] = useState("Deactivated")

    useEffect(() => {
        async function getAccountInformation() {

            try {
                const accountInformation = await fetchAccountInformation();

                setAccountInformation(accountInformation);
            } catch (error) {
                console.error(error)
            }
        }

        getAccountInformation()
    }, [])

    function handleClickSidebar() {
        if (activeSidebar === "Deactivated") {
            setActiveSidebar("Activated")
        } else if (activeSidebar === "Activated") {
            setActiveSidebar("Deactivated")
        }
    }

    return (
        <div className="sidebar" id={activeSidebar}>
                <button onClick={() => handleClickSidebar()}>{activeSidebar === "Activated" ? "X" : ">" }</button>
                    {activeSidebar === "Activated" && (
                        <div className='sidebar-content'>
                            <ul>
                                <li onClick={() => navigate("/dashboard/financial")}>Financieel</li>
                                <li>Andere shit</li>
                                <li>Andere shit 2</li>
                                <li onClick={() => (window.location.href = "https://www.justice.gov/epstein")}>Epstein files</li>
                                <li className={"logout-button"} onClick={() => navigate("/") }>Logout</li>
                            </ul>
                            <div className="account">
                                <div className="account-content">
                                    <h1>{accountInformation.email}</h1>
                                    <p>{accountInformation.role.replace("ROLE_", "")}</p>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
    )
}