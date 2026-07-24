<!-- Automatically generated from reference/html/components/notification.html. Edit reference/html/components/notification.html and run npm run docs:generate again. -->

# Notification

Notification markup, configuration, behavior, and usage example.

## PGS

- `notification`: identifies the notification element used by Notification.
- `notificationTrigger`: identifies the notificationTrigger element used by Notification.
- `notification-element`: identifies the notification-element element used by Notification.
- `notification-element-title`: identifies the notification-element-title element used by Notification.
- `notification-element-content`: identifies the notification-element-content element used by Notification.

## PGS Options

- `toast`: identifies the toast element used by Notification.
- `notification`: identifies the notification element used by Notification.
- `buttonClose`: styles the dismiss action generated at runtime.

## PGS States

- `success`: identifies the success element used by Notification.
- `error`: identifies the error element used by Notification.
- `warning`: identifies the warning element used by Notification.
- `info`: identifies the info element used by Notification.

## JavaScript API

- `pgs.notification.trigger(root)`: provides the documented operation through the component public API.
- `pgs.notification.alert.error(text, link, timeout, icon)`: provides the documented operation through the component public API.
- `pgs.notification.alert.success(text, link, timeout, icon)`: provides the documented operation through the component public API.
- `pgs.notification.alert.info(text, link, timeout, icon)`: provides the documented operation through the component public API.
- `pgs.notification.alert.warning(text, link, timeout, icon)`: provides the documented operation through the component public API.
- `pgs.notification.alert.deleteAll()`: provides the documented operation through the component public API.
- `pgs.notification.toast.error(text, timeout, icon)`: provides the documented operation through the component public API.
- `pgs.notification.toast.success(text, timeout, icon)`: provides the documented operation through the component public API.
- `pgs.notification.toast.info(text, timeout, icon)`: provides the documented operation through the component public API.
- `pgs.notification.toast.warning(text, timeout, icon)`: provides the documented operation through the component public API.
- `pgs.notification.toast.deleteAll()`: provides the documented operation through the component public API.

## Related elements

- `hidden`: uses the related hidden component or utility in this example.

## Output

Complete HTML markup and usage example for Notification.

## Example

```html
<div pgs="notification" aria-live="polite"></div>
<div pgs="notification" pgs-option="toast" aria-live="polite"></div>

<div pgs="hidden notificationTrigger" pgs-option='notification[{
            "title": "Title",
            "message": "Message",
            "element": "notification",
            "type": "info",
            "icon": null,
            "duration": "-1",
            "link": null
        }]'></div>

<div pgs="hidden notificationTrigger" pgs-option='notification[{
            "title": "Benvenuto",
            "message": "Message",
            "element": "toast",
            "type": "info",
            "icon": null,
            "duration": "3000",
            "link": null
        }]'></div>
<!-- 
    <div
        pgs="hidden notificationTrigger"
        pgs-option='notification[{"title":"Title","message":"Message","element":"notification","type":"info","icon":"<i class=\"fa-solid fa-rocket\"></i>","duration":"4000","link":"/page/"}]'>
    </div>
-->
```
