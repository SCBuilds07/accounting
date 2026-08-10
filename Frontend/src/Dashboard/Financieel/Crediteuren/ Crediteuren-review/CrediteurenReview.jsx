import { useState, useEffect } from 'react';
import {fetchCrediteurById, fetchPendingCrediteuren, fetchReviewableCrediteuren ,setCrediteurStatus} from "../../../../api/crediteurenAPI.jsx";
import "./CrediteurenReview.scss"

import ReviewList from "./review-list/ReviewList.jsx";

export default function CrediteurenReview() {
    const PAGE_SIZE = 5;

    const [pendingCrediteuren, setPendingCrediteuren] = useState([]);
    const [reviewableCrediteuren, setReviewableCrediteuren] = useState([])

    const [activeList, setActiveList] = useState("pending");


    const [selectedCrediteurData, setSelectedCrediteurData] = useState(null);

    const [showReviews, setShowReviews] = useState(false);

    const [enteredValues, setEnteredValues] = useState({
        crediteur_id: null,
        name: "",
        email: "",
        message: "",
    });


    const [shownCrediteuren, setShownCrediteuren] = useState({
        startPoint: 0,
        page: 1,
    });

    useEffect(() => {
        async function LoadPendingCrediteuren() {
            try {
                const crediteuren = await fetchPendingCrediteuren();

                setPendingCrediteuren(crediteuren);
            } catch (error) {
                console.error("Could not fetch crediteuren, please try again later.")
            }
        }

        async function LoadReviewableCrediteuren() {
            try {
                const crediteuren = await fetchReviewableCrediteuren();

                setReviewableCrediteuren(crediteuren);
            } catch (error) {
                console.error("Could not fetch crediteuren, please try again later.")
            }
        }

        LoadPendingCrediteuren()
        LoadReviewableCrediteuren()
    }, [])

    async function LoadCrediteur(id) {
        try {
            const result = await fetchCrediteurById(id);

            setSelectedCrediteurData(result);

            setEnteredValues({
                crediteur_id: id,
                name: result.bedrijfCrediteur.name,
                email: result.bedrijfCrediteur.email,
                message: "",
            });
        } catch (error) {
            console.error("could not fetch crediteuren, please try again later.")
        }
    }

    function handleInputChange(identifier, value) {
        setEnteredValues((prevValues) => ({
            ...prevValues,
            [identifier]: value,
        }));
    }

    async function handleCrediteurStatus(status) {
        try {
            await setCrediteurStatus(status, enteredValues);

            if (activeList === "pending") {
                const pendingCrediteuren = await fetchPendingCrediteuren();
                setPendingCrediteuren(pendingCrediteuren);
            }

            if (activeList === "reviewable") {
                const reviewableCrediteuren = await fetchReviewableCrediteuren();
                setReviewableCrediteuren(reviewableCrediteuren);
            }

            setSelectedCrediteurData(null);

        } catch (error) {
            console.error("Could not handle form, please try again!")
        }
    }

    function handlePageRelocation(direction) {
        const change = ( direction === "+" ? PAGE_SIZE : -PAGE_SIZE );

        setShownCrediteuren(prev => ({
            startPoint: prev.startPoint + change,
            page: prev.page + (change > 0 ? 1 : -1),
        }));
    }

    function handleListChange(listType) {
        setActiveList(listType);

        setShownCrediteuren({
            startPoint: 0,
            page: 1,
        });

        setSelectedCrediteurData(null);
        setShowReviews(false);
    }

    const currentCrediteuren =
        activeList === "pending"
            ? pendingCrediteuren
            : reviewableCrediteuren;


    return (
        <section id="CrediteurenReview">
            {activeList === "pending" ? <h1>Pending</h1> : <h1>Reviewable</h1>}
            <div className="buttons">
                <button
                    className={activeList === "pending" ? "active" : ""}
                    onClick={() => handleListChange("pending")}
                    disabled={activeList === "pending"}>
                    Pending
                </button>
                <button
                    className={activeList === "reviewable" ? "active" : ""}
                    onClick={() => handleListChange("reviewable")}
                    disabled={activeList === "reviewable"}>
                    Reviewable
                </button>
            </div>

            {activeList === "pending" && (
                <div className="pendingList">
                    {currentCrediteuren.slice(
                        shownCrediteuren.startPoint,
                        shownCrediteuren.startPoint + PAGE_SIZE
                    ).map((crediteur) => (
                        <article key={crediteur.id} className="pendingCrediteur">
                            <li onClick={() => LoadCrediteur(crediteur.id)}>{'-'} {crediteur.name}</li>
                            {selectedCrediteurData?.bedrijfCrediteur?.id === crediteur.id
                                && (
                                    <article className="review">
                                        <p>Name: {selectedCrediteurData.bedrijfCrediteur.name}</p>
                                        <p>Email: {selectedCrediteurData.bedrijfCrediteur.email}</p>
                                        {selectedCrediteurData.reviews?.length > 0 && (
                                            <button onClick={() => setShowReviews(true)}>
                                                Zie opmerkingen
                                            </button>
                                        )}
                                        <label>Opmerking (Optioneel)</label>
                                        <input type="text" placeholder={"Opmerking..."} onChange={(event) => handleInputChange("message" ,event.target.value)}/>

                                        <div className="buttons">
                                            <button onClick={() => handleCrediteurStatus("ACCEPTED")}>Accept</button>
                                            <button onClick={() => handleCrediteurStatus("REVIEW")}>Request review</button>
                                            <button onClick={() => handleCrediteurStatus("DENIED")}>Deny</button>
                                        </div>
                                    </article>
                                )}
                        </article>
                    ))}
                </div>
            )}

            {activeList === "reviewable" && (
                <div className="reviewableList">
                    {currentCrediteuren.slice(
                        shownCrediteuren.startPoint,
                        shownCrediteuren.startPoint + PAGE_SIZE
                    ).map((crediteur) => (
                        <article key={crediteur.id} className="pendingCrediteur">
                            <li onClick={() => LoadCrediteur(crediteur.id)}>{'-'} {crediteur.name}</li>
                            {selectedCrediteurData?.bedrijfCrediteur?.id === crediteur.id
                                && (
                                    <article className="review">
                                        <label>Naam</label>
                                        <input type="text" value={enteredValues.name}
                                            onChange={(event) =>
                                                handleInputChange("name", event.target.value)
                                            }
                                        />
                                        <label>Email</label>
                                        <input type="email" value={enteredValues.email}
                                            onChange={(event) =>
                                                handleInputChange("email", event.target.value)
                                            }
                                        />
                                        {selectedCrediteurData.reviews?.length > 0 && (
                                            <button onClick={() => setShowReviews(true)}>
                                                Zie opmerkingen
                                            </button>
                                        )}
                                        <label>Opmerking (Optioneel)</label>
                                        <input type="text" placeholder={"Opmerking..."} onChange={(event) => handleInputChange("message" ,event.target.value)}/>

                                        <div className="buttons">
                                            <button onClick={() => handleCrediteurStatus("ACCEPTED")}>Accept</button>
                                            <button onClick={() => handleCrediteurStatus("REVIEW")}>Request review</button>
                                            <button onClick={() => handleCrediteurStatus("DENIED")}>Deny</button>
                                        </div>
                                    </article>
                                )}
                        </article>
                        ))}
                </div>
            )}

            <div className="navigation">
                {shownCrediteuren.startPoint !== 0 && (
                    <button onClick={() => handlePageRelocation("-")}>{'<'}</button>
                )}

                <p>Page: {shownCrediteuren.page}</p>

                {shownCrediteuren.startPoint + 5 < currentCrediteuren.length && (
                    <button onClick={() => handlePageRelocation("+")}>{'>'}</button>
                )}
            </div>


            {showReviews && (
                <ReviewList
                    reviews={selectedCrediteurData?.reviews}
                    crediteur={selectedCrediteurData?.bedrijfCrediteur?.name}
                    onClose={() => setShowReviews(false)}
                />
            )}

        </section>
    )
}