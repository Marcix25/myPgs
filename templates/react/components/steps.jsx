const steps = [
    ["1", "Primo step", "Descrizione del primo passaggio."],
    ["2", "Secondo step", "Descrizione del secondo passaggio."],
    ["3", "Terzo step", "Descrizione del terzo passaggio."],
];

export default function Steps() {
    return (
        <ol pgs="steps">
            {steps.map(([number, title, text]) => (
                <li key={number} pgs="steps-step">
                    <span pgs="steps-step-circle">{number}</span>
                    <div pgs="steps-step-content">
                        <h3>{title}</h3>
                        <p>{text}</p>
                    </div>
                </li>
            ))}
        </ol>
    );
}
