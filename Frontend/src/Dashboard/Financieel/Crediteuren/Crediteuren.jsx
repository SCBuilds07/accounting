import { useState, useEffect } from 'react';
import { fetchActiveCrediteuren, fetchCrediteurById } from "../../../api/crediteurenAPI"
import { useNavigate } from "react-router-dom";
import "./Crediteuren.scss"

export default function Crediteuren() {
    const PAGE_SIZE = 5;

    const navigate = useNavigate();

    const [activeCrediteuren, setActiveCrediteuren] = useState([]);
    const [selectedCrediteur, setSelectedCrediteur] = useState(null)

    const [shownCrediteuren, setShownCrediteuren] = useState({
        startPoint: 0,
        page: 1,
    });

    const [error, setError] = useState();

    useEffect(() => {
        async function fetchCrediteuren() {

            try {
                const crediteuren = await fetchActiveCrediteuren();

                setActiveCrediteuren(crediteuren);
            } catch (error) {
                setError({
                    message:
                        error.message || 'Could not fetch crediteuren, please try again later.',
                 });
            }
        }

        fetchCrediteuren()
    }, [])

    async function fetchCrediteur(id) {
        try {
            const crediteur = await fetchCrediteurById(id);

            setSelectedCrediteur(crediteur);
        } catch (error) {
            setError({
                message:
                    error.message || 'Could not fetch crediteuren, please try again later.',
            });
        }
    }

    function handlePageRelocation(direction) {
        const change = ( direction === "+" ? PAGE_SIZE : -PAGE_SIZE );

        setShownCrediteuren(prev => ({
            startPoint: prev.startPoint + change,
            page: prev.page + (change > 0 ? 1 : -1),
        }));
    }

    return (    
        <section id="crediteuren">
            <button onClick={() => navigate("./add")}>Aanmaken</button>
            <h1>Crediteuren</h1>
            {activeCrediteuren.slice(
                shownCrediteuren.startPoint,
                shownCrediteuren.startPoint + PAGE_SIZE
            ).map((crediteur) => (
                <h2 key={crediteur.id} onClick={() => fetchCrediteur(crediteur.id)}>{crediteur.name}</h2>
            ))}

            <div className="navigation">
                {shownCrediteuren.startPoint !== 0 && (
                    <button onClick={() => handlePageRelocation("-")}>{'<'}</button>
                )}

                <p>Page: {shownCrediteuren.page}</p>

                {shownCrediteuren.startPoint + 5 < activeCrediteuren.length && (
                    <button onClick={() => handlePageRelocation("+")}>{'>'}</button>
                )}
            </div>

            <article id="selectedCrediteur">
                {selectedCrediteur && (
                    <p>{selectedCrediteur.bedrijfCrediteur.name} - {selectedCrediteur.bedrijfCrediteur.email}</p>
                )}
            </article>
        </section>
    )
}