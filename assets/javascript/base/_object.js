document.addEventListener('DOMContentLoaded', () => {
    const objects = document.querySelectorAll('object[type="image/svg+xml"]');

    objects.forEach(obj => {
        function applyAspectRatio(svgDoc) {
            if (!svgDoc) return;
            const svg = svgDoc.querySelector("svg");
            if (!svg) return;

            const computedStyle = window.getComputedStyle(obj);
            svg.setAttribute("preserveAspectRatio", computedStyle.objectFit === 'cover' ? "xMidYMid slice" : "xMidYMid meet");
        }

        function init() {
            const svgDoc = obj.contentDocument;
            if (!svgDoc) return;

            const svg = svgDoc.querySelector('svg');
            if (!svg) return;

            applyAspectRatio(svgDoc);
            if (obj.__objectResizeObserver) return;

            let rafId = 0;
            const resizeObserver = new ResizeObserver(() => {
                if (rafId) return;
                rafId = requestAnimationFrame(() => {
                    rafId = 0;
                    applyAspectRatio(svgDoc);
                });
            });

            resizeObserver.observe(obj);
            obj.__objectResizeObserver = resizeObserver;
        }

        if (obj.contentDocument && obj.contentDocument.querySelector('svg')) init();
        else obj.addEventListener('load', init, { once: true });
    });

    document.body.classList.add("object-loaded");
});
