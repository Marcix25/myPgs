export default function Searchbar() {
    return (
        <form pgs="buttonNohover searchbar" autoComplete="off" action="" method="get">
            <button type="submit" title="Cerca"><i className="fa-solid fa-search"></i></button>
            <input type="search" name="s" placeholder="Cerca" defaultValue="" />
        </form>
    );
}
export default function SearchbarModal() {
    return (

        <div pgs="modal searchbar-modal" pgs-option="containerPGS[header]">
            <button type="button" pgs="modal-button buttonIcon" title="Cerca">
                <i className="fa-solid fa-search"></i>
            </button>

            <dialog>
                <div pgs="flexRow section searchbar-mobile">
                    <form pgs="buttonNohover searchbar" autoComplete="off" action="/" method="get">
                        <button type="submit" title="Cerca">
                            <i className="fa-solid fa-search"></i>
                        </button>

                        <input type="search" name="s" placeholder="Cerca" defaultValue="" />
                    </form>

                    <button type="button" pgs="modal-close buttonIcon">
                        <i className="fa-solid fa-close"></i>
                    </button>
                </div>
            </dialog>
        </div>
    );
}
