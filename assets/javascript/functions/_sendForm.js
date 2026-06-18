import { PGS_toast } from "../functions/_notifications.js";
export async function PGS_sendForm(
    append = {
        formAppend: [
            { name: "", value: "" }
        ],
        wpnonce: {
            name: "",
            value: ""
        },
        action: ""
    },
    tost = {
        succesText: "Inviato con succeso",
        errorGenericText: "Si è verificato un errore",
        infoText: "Invio in corso..."
    }, log = true) {

    PGS_toast.info(tost.infoText, -1)

    //== FORM DATA
    const formData = new FormData();

    //=== Mandatory data 
    formData.append(append.wpnonce.name, append.wpnonce.value);
    formData.append('action', append.action);

    //=== append esempio
    append.formAppend.forEach(item => formData.append(item.name, item.value));

    let status

    try {
        const response = await fetch('/wp-admin/admin-ajax.php', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            PGS_toast.error(`Errore: ${response.status}`)
            status = { success: false, data: [], response: response };
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            status = result;
            PGS_toast.success(tost.succesText)

        } else {
            status = result;
            PGS_toast.error(result.data ? result.data.message : 'Errore sconosciuto')
            console.error(result);
        }

    } catch (error) {
        status = status ? status : { success: false, data: []};
        PGS_toast.error(`Si è verificato un errore nella richiesta.`)
        console.error('Errore:', error);
    }

    if (log) console.log("Status:", status);
    if (log) console.log("formData:", Array.from(formData.entries()));
    return status;
}

/*
let documentForm = document.querySelector("#formExample");
if (documentForm) {
    documentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let appendMandatory = {
            formAppend: [
                {
                    name: "",
                    value: ""
                },
                {
                    name: "",
                    value: ""
                },
            ],
            wpnonce: {
                name: "testName",
                value: "testValue"
            },
            action: "test_submit_form"
        };
        let tost = {
            succesText: "inviato ottimo",
            errorGenericText: "errore invio",
            infoText: "Invio in corso...",

        }

        sendBooking(appendMandatory, tost)
    })
} */