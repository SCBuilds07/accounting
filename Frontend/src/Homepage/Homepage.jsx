import { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Homepage.scss";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authAPI.jsx";

function Homepage() {
    const navigate = useNavigate();

    const [enteredValues, setEnteredValues] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        localStorage.clear();
    }, []);

    function handleInputChange(identifier, value) {
        setEnteredValues((prevValues) => ({
            ...prevValues,
            [identifier]: value,
        }));
    }

    async function handleLogin(event) {
        event.preventDefault();

        try {
            await login(enteredValues);
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className="homepage">
            <Header />

            <main className="hero-section">
                <div className="hero-content-wrapper">
                    <div className="hero-text">
                        <span className="badge">Slimme Boekhoudsoftware</span>
                        <h1>Grip op je financiën, zonder het gedoe</h1>
                        <p>
                            Automatiseer je administratie, verstuur professionele facturen en doe in een handomdraai je btw-aangifte.
                        </p>
                    </div>

                    <div className="login-container">
                        <form className="login-card" onSubmit={handleLogin}>
                            <div className="login-header">
                                <h1>Welcome back</h1>
                                <p>Log in om je dashboard te zien!</p>
                            </div>

                            <div className="input-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="boekhouddrerries@example.com"
                                    value={enteredValues.email}
                                    onChange={(event) =>
                                        handleInputChange("email", event.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="•••••••••••"
                                    value={enteredValues.password}
                                    onChange={(event) =>
                                        handleInputChange("password", event.target.value)
                                    }
                                    required
                                />
                            </div>

                            <button className="login-button" type="submit">
                                <span>Login</span>
                                <span className="arrow">→</span>
                            </button>

                            <div className="login-footer">
                                <span>Secure access to your account</span>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="wave-container">
                    <svg viewBox="0 0 1440 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M 0 100 Q 360 160, 720 100 T 1440 100 L 1440 230 L 0 230 Z"
                            fill="#ffffff"
                            fillOpacity="1">
                        </path>
                    </svg>
                </div>
            </main>

            {/* Witte Features Sectie */}
            <section className="features-section">
                <div className="features-header">
                    <h2>Alles wat je nodig hebt voor je administratie</h2>
                    <p>Speciaal ontworpen voor ondernemers die tijd willen besparen.</p>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="icon">⚡</div>
                        <h3>Automatisch Factureren</h3>
                        <p>Maak en verstuur herkenbare facturen met iDEAL-betaallink binnen 1 minuut.</p>
                    </div>

                    <div className="feature-card">
                        <div className="icon">📊</div>
                        <h3>Realtime Inzicht</h3>
                        <p>Direct overzicht in je omzet, kosten en verwachte btw-afdracht op je dashboard.</p>
                    </div>

                    <div className="feature-card">
                        <div className="icon">🔒</div>
                        <h3>Veilig & WPO-proof</h3>
                        <p>Je gegevens worden versleuteld opgeslagen met dagelijkse back-ups.</p>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="footer-content">

                    <div className="footer-brand">
                        <h2>Boekhoud<span>Drerries</span></h2>
                        <p>
                            Slimme boekhoudsoftware voor ondernemers.
                            Houd grip op je financiën en besteed minder
                            tijd aan administratie.
                        </p>
                    </div>

                    <div className="footer-links">
                        <h3>Navigatie</h3>
                        <a href="/">Home</a>
                        <a href="#features">Functionaliteiten</a>
                        <a href="/privacy">Privacybeleid</a>
                    </div>

                    <div className="footer-links">
                        <h3>Ondersteuning</h3>
                        <a href="mailto:support@boekhouddrerries.nl">
                            Contact
                        </a>
                        <a href="/voorwaarden">Algemene voorwaarden</a>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} BoekhoudDrerries.
                        Alle rechten voorbehouden.
                    </p>
                </div>
            </footer>
        </section>
    );
}

export default Homepage;