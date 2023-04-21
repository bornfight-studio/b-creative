import { useState } from "react";

function App() {
    const [count, setCount] = useState(0);

    return (
        <section className="o-section">
            <div className="o-container">
                <p className="u-fw-700 u-a1">You clicked {count} times</p>
                <button className="c-button" onClick={() => setCount(count + 1)}>
                    Click me
                </button>
            </div>
        </section>
    );
}

export default App;
