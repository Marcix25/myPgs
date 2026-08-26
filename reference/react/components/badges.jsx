const badges = [
    { label: "Base" },
    { label: "Primary", option: "badgePrimary" },
    { label: "Strong", option: "badgeStrong" },
    { label: "Active", option: "badgeSuccess badgeDot" },
    { label: "Warning", option: "badgeWarning", icon: "icon-triangleExclamation" },
    { label: "Error", option: "badgeError", icon: "icon-close" },
    { label: "Info", option: "badgeInfo", icon: "icon-circleInfo" },
    { label: "Neutral", option: "badgeNeutral" },
];

export default function Badges() {
    return (
        <div pgs="flexRow">
            {badges.map(({ label, option, icon }) => (
                <span key={label} pgs="badge" {...(option ? { "pgs-option": option } : {})}>
                    {icon && <i pgs="icon" pgs-option={icon} aria-hidden="true"></i>}
                    {label}
                </span>
            ))}
        </div>
    );
}
