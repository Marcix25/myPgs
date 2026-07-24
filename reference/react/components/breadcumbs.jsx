export default function Breadcumbs() {
    return (
        <nav aria-label="Breadcrumb">
            <ul pgs="breadcrumb">
                <li pgs="breadcrumb-item">
                    <a href="/">Home</a>
                    <span pgs="breadcrumb-item-separator" aria-hidden="true">
                        &gt;
                    </span>
                </li>

                <li pgs="breadcrumb-item">
                    <a href="/blog">Blog</a>
                    <span pgs="breadcrumb-item-separator" aria-hidden="true">
                        &gt;
                    </span>
                </li>

                <li pgs="breadcrumb-item">
                    <span aria-current="page">
                        Sample article
                    </span>
                </li>
            </ul>
        </nav>
    );
}
