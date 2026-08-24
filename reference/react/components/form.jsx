export default function Form() {
    return (
        <form
            pgs="form"
            pgs-option="fieldErrorTitle[Check the form] fieldError[Complete this field] fieldsError[Complete all required fields] successTitle[Submitted] success[Submitted successfully]"
            action="#"
            method="post"
        >
            <label pgs="label" htmlFor="form-name">
                Nome
            </label>
            <input id="form-name" pgs="input" pgs-option="message[Enter your name]" type="text" name="name" placeholder="Mario Rossi" required />

            <label pgs="label" htmlFor="form-email">
                Email
            </label>
            <input id="form-email" pgs="input" pgs-option="message[Enter a valid email address]" type="email" name="email" placeholder="nome@example.com" required />

            <label pgs="label" htmlFor="form-message">
                Message
            </label>
            <textarea id="form-message" pgs="textarea" name="message" rows="5" placeholder="Write your message"></textarea>

            <label pgs="toggle">
                <span>Accetto la privacy policy</span>
                <input type="checkbox" name="privacy" required />
            </label>

            <button pgs="button" pgs-option="buttonStrong" type="submit">
                <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
                Invia
            </button>
        </form>
    );
}
