import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import ReactECharts from "echarts-for-react";

import './Dashboard.scss'
import Sidebar from './Sidebar/Sidebar';

export default function Dashboard() {
    const navigate = useNavigate();
    const [name, setName] = useState(localStorage.getItem("BedrijfNaam"))

    function handleClickNavigation(url) {
        navigate(url)
    }

    return (
        <section id="dashboard">
            <Sidebar />
            <div className="main-dashboard">
                <h1>{name}</h1>
                <button onClick={() => handleClickNavigation("./add")}>ADD</button>
            </div>
        </section>
    )
}