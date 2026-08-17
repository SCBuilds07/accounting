import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs.jsx"

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

            <main className="login-container">

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
            </main>
        </section>
    );
}

export default Homepage;