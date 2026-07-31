const badges = [
    { label: "Base" },
    { label: "Primary", option: "badgePrimary" },
    { label: "Strong", option: "badgeStrong" },
    { label: "Active", option: "badgeSuccess badgeDot" },
    { label: "Warning", option: "badgeWarning", icon: "fa-triangle-exclamation" },
    { label: "Error", option: "badgeError", icon: "fa-xmark" },
    { label: "Info", option: "badgeInfo", icon: "fa-circle-info" },
    { label: "Neutral", option: "badgeNeutral" },
];

export default function Badges() {
    return (
        <div pgs="flexRow">
            {badges.map(({ label, option, icon }) => (
                <span key={label} pgs="badge" {...(option ? { "pgs-option": option } : {})}>
                    {icon && <i className={`fa-solid ${icon}`} aria-hidden="true"></i>}
                    {label}
                </span>
            ))}
        </div>
    );
}
