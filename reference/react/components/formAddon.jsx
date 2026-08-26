export default function FormAddon() {
    return (
        <form pgs="form flexColumn gapElements">
            <section pgs="flexColumn">
                <strong>Checkbox with background</strong>

                <label pgs="checkboxBackground">
                    <input type="checkbox" name="notifications" value="enabled" />
                    <span>
                        <strong>Enable notifications</strong><br />
                        Receive important account updates.
                    </span>
                </label>

                <fieldset pgs="flexRow">
                    <label pgs="checkboxBackground">
                        <input type="radio" name="plan" value="basic" defaultChecked />
                        Basic
                    </label>
                    <label pgs="checkboxBackground">
                        <input type="radio" name="plan" value="pro" />
                        Pro
                    </label>
                    <label pgs="checkboxBackground">
                        <input type="radio" name="plan" value="enterprise" />
                        Enterprise
                    </label>
                </fieldset>
            </section>

            <section pgs="flexColumn">
                <strong>Two-state controls</strong>
                <label pgs="twoState">
                    <input type="checkbox" name="favorite" value="yes" />
                    <i pgs="icon" pgs-option="icon-star" aria-hidden="true"></i>
                    Add to favorites
                </label>
            </section>

            <section pgs="flexColumn">
                <strong>Toggle</strong>
                <label pgs="toggle">
                    <span>Enable Wi-Fi</span>
                    <input type="checkbox" name="darkMode" value="enabled" />
                </label>
            </section>

            <section pgs="flexColumn">
                <strong>Chips checkbox</strong>
                <div pgs="flexRow" role="group" aria-label="Chip actions">
                    <label pgs="chip">
                        <input type="checkbox" name="like" value="basic" />
                        <i pgs="icon" pgs-option="icon-star"></i>
                        Like
                    </label>
                    <label pgs="chip">
                        <input type="checkbox" name="share" value="basic" />
                        <i pgs="icon" pgs-option="icon-star"></i>
                        Share
                    </label>
                </div>
            </section>

            <section pgs="flexColumn gapElements">
                <fieldset pgs="chips">
                    <legend>Chip checkbox</legend>
                    <label>
                        <input type="checkbox" name="plan" value="red" defaultChecked />
                        Red
                    </label>
                    <label>
                        <input type="checkbox" name="plan" value="blue" />
                        Blue
                    </label>
                    <label>
                        <input type="checkbox" name="plan" value="green" />
                        Green
                    </label>
                </fieldset>

                <fieldset pgs="chips">
                    <legend>Chips radio</legend>
                    <label>
                        <input type="radio" name="characters" value="Crow" defaultChecked />
                        <i pgs="icon" pgs-option="icon-star"></i>
                        Crow
                    </label>
                    <label>
                        <input type="radio" name="characters" value="Dove" />
                        <i pgs="icon" pgs-option="icon-star"></i>
                        Dove
                    </label>
                    <label>
                        <input type="radio" name="characters" value="dragon" />
                        <i pgs="icon" pgs-option="icon-star"></i>
                        dragon
                    </label>
                </fieldset>
            </section>
        </form>
    );
}
