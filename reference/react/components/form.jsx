export default function Form() {
    return (
        <form
            pgs="form"
            pgs-option="formFieldErrorTitle[Check the form] formFieldError[Complete this field] formFieldsError[Complete all required fields] formSuccessTitle[Submitted] formSuccess[Submitted successfully]"
            action="#"
            method="post"
        >
            <label pgs="label" htmlFor="form-name">
                Nome
            </label>
            <input id="form-name" pgs="input" pgs-option="formMessage[Enter your name]" type="text" name="name" placeholder="Mario Rossi" required />

            <label pgs="label" htmlFor="form-email">
                Email
            </label>
            <input id="form-email" pgs="input" pgs-option="formMessage[Enter a valid email address]" type="email" name="email" placeholder="nome@example.com" required />

            <label pgs="label" htmlFor="form-message">
                Message
            </label>
            <textarea id="form-message" pgs="textarea" name="message" rows="5" placeholder="Write your message"></textarea>

            <label pgs="toggle">
                <span>Accetto la privacy policy</span>
                <input type="checkbox" name="privacy" required />
            </label>

            <button pgs="button" pgs-option="buttonStrong" type="submit">
                Invia
            </button>
        </form>
    );
}
