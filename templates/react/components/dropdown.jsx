const dropdowns = [
    ["Bottom center", "bottom center content"],
    ["Top left", "top left content", "position[top left]"],
    ["Top center", "top center content", "position[top center]"],
    ["Top right", "top right content", "position[top right]"],
    ["Bottom left", "bottom left content", "position[bottom left]"],
    ["Bottom right", "bottom right content", "position[bottom right]"],
    ["Left center", "left center content", "position[left center]"],
    ["Right center", "right center content", "position[right center]"],
];

export default function Dropdown() {
    return (
        <div pgs="flexRow">
            {dropdowns.map(([label, content, option]) => (
                <span key={label} pgs="dropdown" {...(option ? { "pgs-option": option } : {})}>
                    <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
                        {label}
                        <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                    </button>

                    <div pgs="dropdown-content">
                        {content}
                    </div>
                </span>
            ))}
        </div>
    );
}
