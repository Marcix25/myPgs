const dropdowns = [
    ["Bottom center", "bottom center content"],
    ["Hover", "hover content", "dropdownHover"],
    ["Top left", "top left content", "dropdownPosition[top left]"],
    ["Top center", "top center content", "dropdownPosition[top center]"],
    ["Top right", "top right content", "dropdownPosition[top right]"],
    ["Bottom left", "bottom left content", "dropdownPosition[bottom left]"],
    ["Bottom right", "bottom right content", "dropdownPosition[bottom right]"],
    ["Left center", "left center content", "dropdownPosition[left center]"],
    ["Right center", "right center content", "dropdownPosition[right center]"],
];

export default function Dropdown() {
    return (
        <div pgs="flexRow">
            {dropdowns.map(([label, content, option]) => (
                <span key={label} pgs="dropdown" {...(option ? { "pgs-option": option } : {})}>
                    <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
                        {label}
                        <i pgs="icon" pgs-option="icon-chevronDown" aria-hidden="true"></i>
                    </button>

                    <div pgs="dropdown-content">
                        {content}
                    </div>
                </span>
            ))}
        </div>
    );
}
