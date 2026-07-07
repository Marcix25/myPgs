const notificationData = {
    title: "Titolo",
    message: "Messaggio",
    element: "notification",
    type: "info",
    icon: null,
    duration: "-1",
    link: null,
};

const toastData = {
    title: "Benvetuto",
    message: "Messaggio",
    element: "toast",
    type: "info",
    icon: null,
    duration: "3000",
    link: null,
};

export default function Notification() {
    return (
        <>
            <div pgs="notification" aria-live="polite"></div>
            <div pgs="toast" aria-live="polite"></div>

            <div pgs="hidden notificationTrigger" data-notification={JSON.stringify(notificationData)}></div>
            <div pgs="hidden notificationTrigger" data-notification={JSON.stringify(toastData)}></div>
        </>
    );
}
