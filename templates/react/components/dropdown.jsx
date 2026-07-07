const dropdowns = [
    ["Bottom center", "Contenuto bottom center"],
    ["Top left", "Contenuto top left", "position[top left]"],
    ["Top center", "Contenuto top center", "position[top center]"],
    ["Top right", "Contenuto top right", "position[top right]"],
    ["Bottom left", "Contenuto bottom left", "position[bottom left]"],
    ["Bottom right", "Contenuto bottom right", "position[bottom right]"],
    ["Left center", "Contenuto left center", "position[left center]"],
    ["Right center", "Contenuto right center", "position[right center]"],
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
