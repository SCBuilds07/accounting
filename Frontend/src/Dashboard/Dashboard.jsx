import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import './Dashboard.scss'
import Sidebar from './Sidebar/Sidebar';

export default function Dashboard() {
    const navigate = useNavigate();

    const [name, setName] = useState(
        localStorage.getItem("BedrijfNaam")
    );

    function handleClickNavigation(url) {
        navigate(url);
    }

    return (
        <section id="dashboard">
            <Sidebar />

            <main id="dashboard-main">

                <div className="business-logo">
                    <h1>{name}</h1>
                    <p>
                        Beheer hier eenvoudig jouw bedrijfsomgeving.
                    </p>
                </div>

                <div className="dashboard-grid">

                    <div className="dashboard-card">
                        <h2>Test 1</h2>
                        <p>
                            Hier komt een grafiek ofzo
                        </p>
                    </div>

                    <div className="dashboard-card">
                        <h2>Meldingen</h2>
                        <p>
                            MR BEEAASTTT
                        </p>
                    </div>

                    <div className="dashboard-card">
                        <h2>Test 2</h2>
                        <p>
                            Andere grafiek hier
                        </p>
                    </div>

                    <div className="dashboard-card">
                        <h2>Test 3</h2>
                        <p>
                            Knappe vrouw
                        </p>
                    </div>

                </div>

            </main>
        </section>
    );
}
