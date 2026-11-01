import './Header.scss'

function Header() {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Boekhouddrerries</h1>
                <p>Je hebt het beste geprobeerd, probeer nu de rest!.</p>
            </div>

            <div className="wave-container">
                <svg viewBox="0 0 1440 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M 0 100 Q 360 160, 720 100 T 1440 100 L 1440 220 L 0 220 Z"
                        fill="#ffffff"
                        fill-opacity="1">
                    </path>
                </svg>
            </div>
        </section>
    )
}

export default Header