import "./ReviewList.scss";

export default function ReviewList({ reviews, crediteur ,onClose }) {
    return (
        <div className="reviews-overlay">
            <section id="reviews">
                <button className="close-button" onClick={onClose}>
                    ×
                </button>

                <h1>{crediteur}</h1>
                 <div className="review-list">
                        {reviews.map((review) => (
                            <article className="review-item" key={review.id}>
                                <p><span>{review.email}:</span> {review.message}</p>
                            </article>
                        ))}
                    </div>
            </section>
        </div>
    );
}
