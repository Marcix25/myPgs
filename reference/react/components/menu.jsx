const homeItem = (
    <li>
        <a href="/" aria-current="page">
            <i className="fa-solid fa-house" aria-hidden="true"></i>
            <span>Home</span>
        </a>
    </li>
);

const servicesItem = (
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
);

function MenuHorizontal() {
    return (
        <nav pgs="menu" pgs-option="horizontal" aria-label="Menu orizzontale">
            <ul>
                {homeItem}
                {servicesItem}
            </ul>
        </nav>
    );
}

function MenuVertical() {
    return (
        <nav pgs="menu" pgs-option="vertical menuIconOnlyCurrent" aria-label="Menu verticale">
            <ul>
                {homeItem}
                {servicesItem}
                <li>
                    <a href="/about">
                        <i className="fa-solid fa-info-circle" aria-hidden="true"></i>
                        <span>about</span>
                    </a>
                    <ul>
                        <li><a href="/servizi/uno">Servizio uno</a></li>
                        <li>
                            <a href="/servizi/due">Servizio due</a>
                            <ul>
                                <li><a href="/servizi/uno">Servizio uno</a></li>
                                <li><a href="/servizi/due">Servizio due</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}

export default function Menu() {
    return (
        <>
            <MenuHorizontal />
            <MenuVertical />
        </>
    );
}
