export default function Tooltip() {
    return (
        <span pgs="dropdown tooltip">
            <button pgs="dropdown-button buttonMini tooltip-button" title="open-tooltip" type="button">
                <i className="fa-solid fa-info"></i>
            </button>
            <div pgs="dropdown-content tooltip-content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto hic, id consectetur facilis et, iste animi minima quidem praesentium omnis quod. Quidem provident ad cum aut reprehenderit laboriosam eum placeat.
            </div>
        </span>
    );
}
