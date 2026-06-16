//# PGS_notification
function initNotification(type, containerToken, icon, text, timeout, methodDelete = "replace", link = null) {
    let containerNotification = pgs(document).querySelector(containerToken);

    //== Create Container
    if (!containerNotification) {
        const newContainer = document.createElement("div");
        pgs(newContainer).add(containerToken);
        newContainer.setAttribute("aria-live", "polite");
        newContainer.setAttribute("aria-relevant", "additions");
        document.body.appendChild(newContainer);
        containerNotification = newContainer;
    }

    //== Create Notification
    const notification = document.createElement(link ? "a" : "div");
    if (methodDelete == "replace") containerNotification.innerHTML = "";
    if (link) notification.href = link;
    if (timeout > 0) notification.style.setProperty("--notification-timeout", timeout + "ms");
    pgs(notification).state.add(type);
    pgs(notification).add("notification-element");
    notification.setAttribute("role", type == "error" ? "alert" : "status")
    notification.innerHTML = `${icon} <p>${text}</p>`;
    containerNotification.appendChild(notification);


    //+ Animation delete 
    function deleteNotification() {
        methodDelete == "stack" ? notification.style.translate = "120%" : notification.style.opacity = "0";
        setTimeout(() => notification.remove(), 300);
    }

    //== Timeout delete
    if (timeout > 0) setTimeout(() => { deleteNotification() }, timeout);

    //== button delete
    const btnDelete = document.createElement("button");
    btnDelete.type = "button";
    btnDelete.ariaLabel = "Rimuovi notifica";
    btnDelete.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    btnDelete.setAttribute("pgs", "buttonClose");
    notification.insertAdjacentElement("afterbegin", btnDelete);

    //== event
    btnDelete.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation()
        deleteNotification(e); // Esegue la tua funzione
    });
}

function deleteALl(containerToken) {
    let containerNotification = pgs(document).querySelector(containerToken);
    if (containerNotification) containerNotification.innerHTML = "";
}



export let PGS_notification = {
    error: (text = "Errore", link = null, timeout = 0, icon = '<i class="fa-solid fa-octagon-xmark"></i>') => initNotification("error", "notification", icon, text, timeout, "stack", link),
    success: (text = "Aggiornato", link = null, timeout = 0, icon = '<i class="fa-solid fa-check"></i>') => initNotification("success", "notification", icon, text, timeout, "stack", link),
    info: (text = "Aggiornamento", link = null, timeout = 0, icon = '<i class="fa-solid fa-circle-info"></i>',) => initNotification("info", "notification", icon, text, timeout, "stack", link),
    warning: (text = "Attenzione", link = null, timeout = 0, icon = '<i class="fa-solid fa-triangle-exclamation"></i>') => initNotification("warning", "notification", icon, text, timeout, "stack", link),
    deleteAllNotification: () => deleteALl("notification")
}

export let PGS_toast = {
    error: (text = "Errore", timeout = 4000, icon = '<i class="fa-solid fa-octagon-xmark"></i>',) => initNotification("error", "toast", icon, text, timeout),
    success: (text = "Aggiornato", timeout = 4000, icon = '<i class="fa-solid fa-check"></i>',) => initNotification("success", "toast", icon, text, timeout),
    info: (text = "Aggiornamento", timeout = 0, icon = '<i class="fa-solid fa-circle-info"></i>',) => initNotification("info", "toast", icon, text, timeout),
    warning: (text = "Attenzione", timeout = 4000, icon = '<i class="fa-solid fa-triangle-exclamation"></i>',) => initNotification("warning", "toast", icon, text, timeout),
    deleteTost: () => deleteALl("toast")
}