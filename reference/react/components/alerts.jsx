const alerts = [
    {
        state: "info",
        role: "status",
        icon: "fa-circle-info",
        title: "Information",
        message: "Your profile information can be updated at any time.",
    },
    {
        state: "success",
        role: "status",
        icon: "fa-circle-check",
        title: "Changes saved",
        message: "Your preferences were updated successfully.",
    },
    {
        state: "warning",
        role: "alert",
        icon: "fa-triangle-exclamation",
        title: "Check your information",
        message: "Some fields may require your attention before continuing.",
    },
    {
        state: "error",
        role: "alert",
        icon: "fa-circle-xmark",
        title: "Unable to save",
        message: "Correct the reported errors and try again.",
    },
];

export default function Alerts() {
    return (
        <div pgs="alertContainer flexColumn gapElements">
            {alerts.map(({ state, role, icon, title, message }) => (
                <div key={state} pgs="alert" pgs-state={state} role={role}>
                    <i pgs="alert-icon" className={`fa-solid ${icon}`} aria-hidden="true"></i>
                    <div pgs="alert-content">
                        <strong pgs="alert-content-title">{title}</strong>
                        <p>{message}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
