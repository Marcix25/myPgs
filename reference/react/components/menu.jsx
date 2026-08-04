const menuItems = (
    <ul>
        <li>
            <a href="/" aria-current="page">
                <i className="fa-solid fa-house" aria-hidden="true"></i>
                <span>Home</span>
            </a>
        </li>
        <li>
            <a href="/servizi">
                <i className="fa-solid fa-layer-group" aria-hidden="true"></i>
                <span>Servizi</span>
            </a>
            <ul>
                <li><a href="/servizi/uno">Servizio uno</a></li>
                <li><a href="/servizi/due">Servizio due</a></li>
            </ul>
        </li>
    </ul>
);

export default function MenuHorizontal() {
    return (
        <nav pgs="menu" pgs-option="horizontal" aria-label="Menu orizzontale">
            {menuItems}
        </nav>
    );
}

export default function MenuVertical() {
    return (

        <nav pgs="menu" pgs-option="vertical menuIconOnlyCurrent" aria-label="Menu verticale">
            {menuItems}
        </nav>
    );
}
