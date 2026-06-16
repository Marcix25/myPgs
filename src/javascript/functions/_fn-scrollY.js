export function PGS_scrollHorizontal(querySelector, dataSpeed) {
    // Se hai più contenitori, selezionali tutti:
    // Semplice "singleton" per stimare se la sorgente è trackpad
    const TrackpadDetector = (() => {
        let lastTs = 0;
        let smallAndFast = 0;
        let samples = 0;
        let isTrackpad = false;

        function update(e) {
            const now = performance.now();
            const dt = now - lastTs;

            // Porta delta in px (0: px, 1: linee, 2: pagine)
            let dy = Math.abs(e.deltaY);
            if (e.deltaMode === 1) dy *= 16;
            else if (e.deltaMode === 2) dy *= e.currentTarget?.clientHeight || 800;

            // Heuristica: eventi piccoli e ravvicinati → prob. trackpad
            const small = dy < 30;          // soglia prudente
            const fast = dt < 35;          // alta frequenza
            if (small && fast) smallAndFast++;

            samples++;
            if (samples >= 6) {             // aggiorna il giudizio ogni N eventi
                isTrackpad = smallAndFast >= 3;
                smallAndFast = 0;
                samples = 0;
            }

            lastTs = now;
            return isTrackpad;
        }

        return {
            update,
            get value() { return isTrackpad; }
        };
    })();

    //= Scorrimento orizzontale con rotella (evita il trackpad)
    
    let el = querySelector
    el.addEventListener('wheel', (e) => {
        const speed = dataSpeed;

        //== lascia lo scroll naturale del trackpad
        if (TrackpadDetector.update(e)) return;

        //== Evita interferenze con zoom o scroll orizzontale nativo
        if (e.ctrlKey) return;
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

        //== Converti delta in px per lo shift orizzontale
        let delta = e.deltaY;
        if (e.deltaMode === 1) delta *= 16;
        else if (e.deltaMode === 2) delta *= el.clientHeight;

        //== Verifica se il contenitore può ancora scrollare orizzontalmente
        const atStart = el.scrollLeft <= 0;
        const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
        const scrollingRight = delta > 0;
        const scrollingLeft = delta < 0;
        const canScrollHoriz =
            (scrollingRight && !atEnd) ||
            (scrollingLeft && !atStart);

        // Se non può più scrollare in quella direzione, lascia che la pagina gestisca lo scroll verticale
        if (!canScrollHoriz) return;

        //== Previeni il default solo quando facciamo noi lo scroll orizzontale
        e.preventDefault();

        //== rotella giù => destra
        el.scrollLeft += delta * speed;
    }, { passive: false });
}
