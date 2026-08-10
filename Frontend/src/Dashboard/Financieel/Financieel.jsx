import './Financieel.scss'

import Sidebar from '../Sidebar/Sidebar';
import {FINANCIEEL_CONFIG} from './FINANCIEEL_CONFIG'
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchPendingCrediteurenSize} from "../../api/crediteurenAPI.jsx";


export default function Financieel() {
    const navigate = useNavigate();
    const [size, setSize] = useState(0);

    useEffect(() => {
        async function fetchSize() {
            const result = await fetchPendingCrediteurenSize()
            setSize(result)
        }

        fetchSize();
    }, []);

    return (
        <section id='financieel'>
            <Sidebar />
            <div className="main-financieel">
                <h1>Financieel</h1>
                <div className="financieel-content">
                    {Object.entries(FINANCIEEL_CONFIG).map(([categorie, data]) => (
                        <div key={categorie} className='categorie'>
                            <h2>{categorie}</h2>
                            <ul>
                                {data.koppen.map((item => (
                                    <li key={item.id} onClick={() => navigate("/dashboard" + item.link)}><span>{'> '}</span>{item.id} {item.id === "Review" && `(${size})`}</li>
                                    )))}
                            </ul>
                        </div>
                        ))}
                </div>
            </div>
        </section>
    )
}