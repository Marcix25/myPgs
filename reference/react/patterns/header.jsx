export default function Header() {
    return (
        <header pgs="header">
            <div pgs="header-element">
                <div pgs="header-element-alwaysOn">
                    <a aria-label="Logo" pgs="logo" href="/">
                        <span pgs="logo-text">MyPGS</span>
                    </a>
                </div>

                <div pgs="header-element-onlyFull">
                    <nav pgs="menu" pgs-option="menuHorizontal menuShort" aria-label="Main menu">
                        <ul>
                            <li><a pgs="button" pgs-option="buttonText" href="/">Home</a></li>
                            <li><a pgs="button" pgs-option="buttonText" href="#componenti">Componenti</a></li>
                            <li><a pgs="button" pgs-option="buttonText" href="#layout">Layout</a></li>
                        </ul>
                    </nav>
                </div>

                <div pgs="header-element-onlyCompact"></div>

                <div pgs="header-element-alwaysOnLast">
                    <button pgs="button toggleDarkmode" pgs-option="buttonIcon" type="button" aria-label="Change theme">
                        <i pgs="icon"></i>
                    </button>
                </div>

                <div pgs="header-element-hamburger modal" pgs-option="modalContainerPGS[header] ">
                    <button pgs="button modal-button modal-close header-element-hamburger-button" pgs-option="buttonIcon" type="button" aria-label="Open menu">
                        <i pgs="icon" pgs-option="iconDuo-hamburger" aria-hidden="true"></i>
                    </button>

                    <dialog pgs="modal-dialog" pgs-option="modalRight">
                        <div pgs="modal-dialog-content">
                            <nav pgs="menu" pgs-option="menuVertical" aria-label="Mobile menu">
                                <ul>
                                    <li><a pgs="button" pgs-option="buttonText" href="/">Home</a></li>
                                    <li><a pgs="button" pgs-option="buttonText" href="#componenti">Componenti</a></li>
                                    <li><a pgs="button" pgs-option="buttonText" href="#layout">Layout</a></li>
                                </ul>
                            </nav>
                        </div>
                    </dialog>
                </div>
            </div>
        </header>
    );
}
