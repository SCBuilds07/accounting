import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCrediteur } from "../../../../api/crediteurenAPI.jsx";

import "./AddCrediteur.scss";

export default function AddCrediteur() {
    const navigate = useNavigate();

    const [enteredValues, setEnteredValues] = useState({
        name: "",
        email: "",
    });

    function handleInputChange(identifier, value) {
        setEnteredValues((prevValues) => ({
            ...prevValues,
            [identifier]: value,
        }));
    }

    async function handleCrediteurSubmit(event) {
        event.preventDefault();

        try {
            await createCrediteur(enteredValues);

            navigate("/dashboard/crediteuren");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section id="addCrediteur">
            <div className="header">
                <h1>Nieuwe crediteur</h1>
                <p>
                    Voeg een nieuwe crediteur toe aan je administratie.
                </p>
            </div>


            <form
                className="addCrediteur-form"
                onSubmit={handleCrediteurSubmit}
            >
                <div className="input-group">
                    <label htmlFor="name">
                        Naam
                    </label>

                    <input
                        id="name"
                        type="text"
                        placeholder="Bijvoorbeeld: Acme B.V."
                        value={enteredValues.name}
                        onChange={(event) =>
                            handleInputChange("name", event.target.value)
                        }
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="email">
                        E-mailadres
                    </label>

                    <input
                        id="email"
                        type="email"
                        placeholder="bijvoorbeeld@bedrijf.nl"
                        value={enteredValues.email}
                        onChange={(event) =>
                            handleInputChange("email", event.target.value)
                        }
                        required
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() => navigate("/dashboard/crediteuren")}
                    >
                        Annuleren
                    </button>

                    <button
                        type="submit"
                        className="submit-button"
                    >
                        <span>Crediteur toevoegen</span>
                        <span className="arrow">→</span>
                    </button>
                </div>
            </form>
        </section>
    );
}