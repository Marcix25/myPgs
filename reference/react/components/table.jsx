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
                        <td>First item</td>
                        <td>Active</td>
                        <td>2026-01-01</td>
                    </tr>
                    <tr>
                        <td>Second item</td>
                        <td>Draft</td>
                        <td>2026-02-01</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
