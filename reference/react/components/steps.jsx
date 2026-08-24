const steps = [
    ["1", "First step", "What happens in the first step."],
    ["2", "Second step", "What happens in the second step."],
    ["3", "Third step", "What happens in the third step."],
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
