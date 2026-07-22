export default function Table() {
    return (
        <div pgs="table">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Stato</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Elemento uno</td>
                        <td>Active</td>
                        <td>2026-01-01</td>
                    </tr>
                    <tr>
                        <td>Elemento due</td>
                        <td>Bozza</td>
                        <td>2026-02-01</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
