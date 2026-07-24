export default function Search() {
    return (
        <form pgs="button search" pgs-option="buttonNohover" autoComplete="off" action="" method="get">
            <button type="submit" title="Search"><i className="fa-solid fa-search"></i></button>
            <input type="search" name="s" placeholder="Search" defaultValue="" />
            <ul pgs="search-suggestions"></ul>
        </form>
    );
}

export function SearchModal() {
    return (
        <div pgs="modal search-modal" pgs-option="containerPGS[header]">
            <button type="button" pgs="modal-button button" pgs-option="buttonIcon" title="Search">
                <i className="fa-solid fa-search"></i>
            </button>

            <dialog>
                <div pgs="flexRow section search-mobile">
                    <form pgs="button search" pgs-option="buttonNohover" autoComplete="off" action="/" method="get">
                        <button type="submit" title="Search">
                            <i className="fa-solid fa-search"></i>
                        </button>

                        <input type="search" name="s" placeholder="Search" defaultValue="" />
                        <ul pgs="search-suggestions"></ul>
                    </form>

                    <button type="button" pgs="modal-close button" pgs-option="buttonIcon">
                        <i className="fa-solid fa-close"></i>
                    </button>
                </div>
            </dialog>
        </div>
    );
}
