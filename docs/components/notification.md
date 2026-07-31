<!-- Automatically generated from reference/html/components/notification.html. Edit reference/html/components/notification.html and run npm run docs:generate again. -->

# Notification

Notification markup, configuration, behavior, and usage example.

## PGS

- `notification`: identifies the notification element used by Notification.
- `notificationTrigger`: creates one or more notifications from comma-separated JSON objects.
- `notification-element`: identifies the notification-element element used by Notification.
- `notification-element-content`: contains the icon, title, and description.
- `notification-element-icon`: contains the icon displayed to the left of the text.
- `notification-element-buttons`: contains the link and dismiss actions below the content.

## PGS Options

- `toast`: identifies the toast element used by Notification.
- `notification`: identifies the notification element used by Notification.

## PGS States

- `success`: identifies the success element used by Notification.
- `error`: identifies the error element used by Notification.
- `warning`: identifies the warning element used by Notification.
- `info`: identifies the info element used by Notification.

## JavaScript API

- `pgs.notification.trigger(root)`: provides the documented operation through the component public API.
- `pgs.notification.alert.error(optionsOrTitle)`: accepts a title string or options with element, title, description, timeout, icon, link, linkTitle, and closeTitle.
- `pgs.notification.alert.success(optionsOrTitle)`: accepts a title string or options with element, title, description, timeout, icon, link, linkTitle, and closeTitle.
- `pgs.notification.alert.info(optionsOrTitle)`: accepts a title string or options with element, title, description, timeout, icon, link, linkTitle, and closeTitle.
- `pgs.notification.alert.warning(optionsOrTitle)`: accepts a title string or options with element, title, description, timeout, icon, link, linkTitle, and closeTitle.
- `pgs.notification.alert.deleteAll()`: provides the documented operation through the component public API.
- `pgs.notification.toast.error(optionsOrTitle)`: accepts a title string or options with element, title, description, timeout, icon, link, linkTitle, and closeTitle.
- `pgs.notification.toast.success(optionsOrTitle)`: accepts a title string or options with element, title, description, timeout, icon, link, linkTitle, and closeTitle.
- `pgs.notification.toast.info(optionsOrTitle)`: accepts a title string or options with element, title, description, timeout, icon, link, linkTitle, and closeTitle.
- `pgs.notification.toast.warning(optionsOrTitle)`: accepts a title string or options with element, title, description, timeout, icon, link, linkTitle, and closeTitle.
- `pgs.notification.toast.deleteAll()`: provides the documented operation through the component public API.

## Related elements

- `hidden`: uses the related hidden component or utility in this example.

## Output

Complete HTML markup and usage example for Notification.

## Example

```html
<div pgs="notification" aria-live="polite"></div>
<div pgs="notification" pgs-option="toast" aria-live="polite"></div>

<div pgs="hidden notificationTrigger" pgs-option='notification[
        {
            "title": "Identifies the success",
            "message": "identifies the notification element used by Notification.",
            "element": "notification",
            "type": "info",
            "icon": null,
            "duration": "-1",
            "link": "/page/",
            "title-link": "Open",
            "title-close": "Close"
        }
]'></div>

<div pgs="hidden notificationTrigger" pgs-option='notification[{
            "title": "Benvenuto",
            "message": "Message",
            "element": "toast",
            "type": "success",
            "icon": null,
            "duration": "7000",
            "link": null,
            "title-link": "Open",
            "title-close": "Close"
        }]'></div>
```
