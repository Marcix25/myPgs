import { useEffect } from "react";

export default function Header() {
    useEffect(() => {
        if (localStorage.getItem("screenIsDarkMode") === "true") {
            ;
            document.querySelector(":root")?.setAttribute("data-darkmode", "true");
            document.body.setAttribute("data-darkmode", "true");
        }

        if (window.innerWidth < 600 && window.pgs) {
            window.pgs(document.querySelector("header")).state.add("mobileActive");
            window.pgs(document.querySelector("[pgs~=header-element]")).state.add("mobileActive");
        }
    }, []);

    return (
        <header pgs="header">
            <div pgs="header-element">
                <div pgs="header-element-alwaysOn">
                    <a aria-label="Logo" pgs="logo" href="/">
                        <span pgs="logo-text">MyPGS</span>
                    </a>
                </div>

                <div pgs="header-element-onlyDesktop">
                    <nav pgs="menu" pgs-option="horizontal menuHeader" aria-label="Menu principale">
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="#componenti">Componenti</a></li>
                            <li><a href="#layout">Layout</a></li>
                        </ul>
                    </nav>
                </div>

                <div pgs="header-element-onlyMobile"></div>

                <div pgs="header-element-alwaysOnLast">
                    <button pgs="buttonIcon toggleDarkmode" type="button" aria-label="Cambia tema">
                        <i className="fa-solid fa-moon"></i>
                    </button>
                </div>

                <div pgs="header-element-hamburger modal" pgs-option="containerPGS[header] ">
                    <button pgs="buttonIcon modal-button modal-close header-element-hamburger-button" type="button"></button>

                    <dialog pgs="modal-dialog" pgs-option="right">
                        <div pgs="modal-dialog-content">
                            <nav pgs="menu" pgs-option="vertical menuHeader" aria-label="Menu mobile">
                                <ul>
                                    <li><a href="/">Home</a></li>
                                    <li><a href="#componenti">Componenti</a></li>
                                    <li><a href="#layout">Layout</a></li>
                                </ul>
                            </nav>
                        </div>
                    </dialog>
                </div>
            </div>
        </header>
    );
}
