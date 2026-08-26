const alerts = [
    {
        state: "info",
        role: "status",
        icon: "icon-circleInfo",
        title: "Information",
        message: "Your profile information can be updated at any time.",
    },
    {
        state: "success",
        role: "status",
        icon: "icon-circleCheck",
        title: "Changes saved",
        message: "Your preferences were updated successfully.",
    },
    {
        state: "warning",
        role: "alert",
        icon: "icon-triangleExclamation",
        title: "Check your information",
        message: "Some fields may require your attention before continuing.",
    },
    {
        state: "error",
        role: "alert",
        icon: "icon-circleXmark",
        title: "Unable to save",
        message: "Correct the reported errors and try again.",
    },
];

export default function Alerts() {
    return (
        <div pgs="alertContainer flexColumn gapElements">
            {alerts.map(({ state, role, icon, title, message }) => (
                <div key={state} pgs="alert" pgs-state={state} role={role}>
                    <i pgs="alert-icon icon" pgs-option={icon} aria-hidden="true"></i>
                    <div pgs="alert-content">
                        <strong pgs="alert-content-title">{title}</strong>
                        <p>{message}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
