const notificationData = [
    {
        title: "Identifies the success",
        message: "identifies the notification element used by Notification.",
        element: "notification",
        type: "info",
        icon: null,
        duration: "-1",
        link: "/page/",
        "title-link": "Open",
        "title-close": "Close",
    },
    {
        title: "Problem loading the page",
        message: "Try reloading the page.",
        element: "notification",
        type: "error",
        icon: null,
        duration: "-1",
        link: "/page/",
        "title-link": "Open",
        "title-close": "Close",
    },
];

const toastData = {
    title: "Benvenuto",
    message: "Message",
    element: "toast",
    type: "success",
    icon: null,
    duration: "7000",
    link: null,
    "title-link": "Open",
    "title-close": "Close",
};

export default function Notification() {
    return (
        <>
            <div pgs="notification" aria-live="polite"></div>
            <div pgs="notification" pgs-option="toast" aria-live="polite"></div>

            <div
                pgs="hidden notificationTrigger"
                pgs-option={`notification[${notificationData.map(notification => JSON.stringify(notification)).join(",")}]`}>
            </div>
            <div pgs="hidden notificationTrigger" pgs-option={`notification[${JSON.stringify(toastData)}]`}></div>
        </>
    );
}
