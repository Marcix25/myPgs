import { PGS_notification, PGS_toast } from "../components/_cn-notifications.js";

function escapeHtml(value) {
    return String(value ?? "");
}

function getDuration(notification) {
    const rawDuration = notification.duration;
    const duration = Number.parseInt(rawDuration, 10);

    return Number.isNaN(duration) ? 5000 : duration;
}

function getNotificationApi(notification) {
    const element = String(notification.element || "notification").trim();

    return element === "toast" ? PGS_toast : PGS_notification;
}

function getNotificationType(notification, api) {
    const type = String(notification.type || "info").trim();

    return typeof api[type] === "function" ? type : "info";
}

function getNotificationData(root) {
    try {
        return JSON.parse(root.dataset.notification || "{}");
    } catch (error) {
        console.warn("PGS notification: dati non validi", error);
        return {};
    }
}

function getNotificationContent(title, content) {
    const safeContent = escapeHtml(content);
    const safeTitle = escapeHtml(title);

    if (!safeTitle) return safeContent;
    if (!safeContent) return `<span pgs="notification-element-title">${safeTitle}</span>`;

    return `
        <span pgs="notification-element-title">${safeTitle}</span>
        <br>
        <span pgs="notification-element-content">${safeContent}</span>
    `;
}

export function PGS_md_notification(root) {
    if (!root || root.dataset.initialize === "true") return;
    root.dataset.initialize = "true";

    const notification = getNotificationData(root);
    const title = String(notification.title || "").trim();
    const content = String(notification.message || "").trim();
    if (!title && !content) {
        root.remove();
        return;
    }

    const link = notification.link || null;
    const icon = notification.icon || undefined;
    const duration = getDuration(notification);
    const api = getNotificationApi(notification);
    const type = getNotificationType(notification, api);
    const formattedContent = getNotificationContent(title, content);

    if (api === PGS_toast) {
        api[type](formattedContent, duration, icon);
    } else {
        api[type](formattedContent, link, duration, icon);
    }

    root.remove();
}

function initMdNotifications() {
    pgs(document).querySelectorAll("notificationTrigger").forEach(PGS_md_notification);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMdNotifications);
} else {
    initMdNotifications();
}
