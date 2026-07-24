const notificationData = {
    title: "Title",
    message: "Message",
    element: "notification",
    type: "info",
    icon: null,
    duration: "-1",
    link: null,
};

const toastData = {
    title: "Benvenuto",
    message: "Message",
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
            <div pgs="notification" pgs-option="toast" aria-live="polite"></div>

            <div pgs="hidden notificationTrigger" pgs-option={`notification[${JSON.stringify(notificationData)}]`}></div>
            <div pgs="hidden notificationTrigger" pgs-option={`notification[${JSON.stringify(toastData)}]`}></div>
        </>
    );
}
