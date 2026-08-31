const homeItem = (
    <li>
        <a href="/" aria-current="page">
            <i pgs="icon" pgs-option="icon-circle" aria-hidden="true"></i>
            <span>Home</span>
        </a>
    </li>
);

const servicesItem = (
    <li>
        <a href="/services">
            <i pgs="icon" pgs-option="icon-sliders" aria-hidden="true"></i>
            <span>Services</span>
        </a>
        <ul>
            <li><a href="/services/one">First service</a></li>
            <li><a href="/services/two">Second service</a></li>
        </ul>
    </li>
);

function MenuHorizontal() {
    return (
        <nav pgs="menu" pgs-option="menuHorizontal" aria-label="Menu orizzontale">
            <ul>
                {homeItem}
                {servicesItem}
            </ul>
        </nav>
    );
}

function MenuVertical() {
    return (
        <nav pgs="menu" pgs-option="menuVertical menuIconOnlyCurrent" aria-label="Menu verticale">
            <ul>
                {homeItem}
                {servicesItem}
                <li>
                    <a href="/about">
                        <i pgs="icon" pgs-option="icon-circleInfo" aria-hidden="true"></i>
                        <span>about</span>
                    </a>
                    <ul>
                        <li><a href="/services/one">First service</a></li>
                        <li>
                            <a href="/services/two">Second service</a>
                            <ul>
                                <li><a href="/services/one">First service</a></li>
                                <li><a href="/services/two">Second service</a></li>
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
