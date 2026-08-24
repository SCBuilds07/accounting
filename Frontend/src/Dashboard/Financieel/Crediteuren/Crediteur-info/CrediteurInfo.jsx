import "./CrediteurInfo.scss"

export default function CrediteurInfo({crediteur, onClose}) {
    return (
        <div className="reviews-overlay">
            <section id="reviews">
                <button className="close-button" onClick={onClose}>
                    ×
                </button>

                <h1>{crediteur.bedrijfCrediteur?.name}</h1>
                <p>email: {crediteur.bedrijfCrediteur?.email}</p>
            </section>
        </div>
    )
}