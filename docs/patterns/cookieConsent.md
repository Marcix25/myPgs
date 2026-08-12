<!-- Automatically generated from reference/html/patterns/cookieConsent.html. Edit reference/html/patterns/cookieConsent.html and run npm run docs:generate again. -->

# Cookie Consent

Accessible pattern for collecting and storing analytics cookie consent, applying preferences, and loading Google Analytics only when authorized. Author only a hidden marker element with a JSON config — pgs.cookieConsent generates the whole modal, dialog, and content from it (see the full field reference in the commented example below), then removes the marker. It lives inside a modal dialog (see Modal): open/close, backdrop, focus trap, ESC-to-close, and focus restore are all handled natively by the dialog through pgs.modal. It has no modal-button of its own — it opens itself on load when no valid saved preference exists, and can be reopened later from anywhere on the page through cookieConsent-actionOpen (e.g. a footer link).

## PGS

- `cookieConsent`: identifies the hidden JSON marker read on page load; pgs.cookieConsent replaces it with the generated modal wrapper carrying the same token.
- `cookieConsent-panel`: identifies the configurable preference group.
- `cookieConsent-panel-featureEssential`: identifies the row of always-active essential cookies.
- `cookieConsent-panel-badge`: identifies the essential-cookie status indicator.
- `cookieConsent-panel-featureAnalytics`: identifies the optional analytics-cookie row.
- `cookieConsent-panel-toggleAnalytics`: identifies the control that enables analytics consent.
- `cookieConsent-actionReject`: applies selected preferences without automatically accepting analytics.
- `cookieConsent-actionAccept`: accepts all available cookies.
- `cookieConsent-actionOpen`: identifies external controls that reopen the preference panel.
- `cookieConsent-gaUnavailable`: runtime token applied to the root when no usable measurement ID is available.
- `cookieConsent-accepted`: runtime token applied to the root when analytics is allowed.
- `cookieConsent-declined`: runtime token applied to the root when analytics is not allowed.

## PGS Options

- `cookieConsent`: JSON object read from the hidden marker on page load — see the full field reference, with every optional field and its default, in the commented example below.
- `buttonStrong`: presents full acceptance as the primary action.
- `topLevel`: centers the dialog with a backdrop instead of positioning it inline; see Modal.
- `badgeSuccess`: presents the essential-cookie badge with the success color; see Badges.

## JavaScript API

- `pgs.cookieConsent.init(root)`: reads the JSON marker inside the provided document or element, generates the pattern from it, and initializes it.

## Related elements

- `flexColumn`: vertically organizes the JS-generated dialog content and the preference panel.
- `gapElements`: applies element spacing to the JS-generated dialog content.
- `flexRow`: arranges panel rows and actions.
- `nowrap`: prevents wrapping in the essential-cookie row.
- `toggle`: presents analytics consent as a switch.
- `button`: presents the selection actions with standard styling.
- `badge`: presents the essential-cookie status indicator; see Badges.
- `modal`: wraps cookieConsent and the dialog, providing open/close behavior shared with every other dialog on the page.
- `modal-dialog-content`: identifies the JS-generated styled content area inside the dialog.
- `hidden`: uses the related hidden component or utility in this example.

## Output

Consent panel HTML with essential and analytics preferences, actions, and accessible attributes.

## JSON Schema

```json
cookieConsent[{
    "titleIntro": "Cookies and privacy",
    "titleHeading": "Your privacy comes first",
    "description": "",
    "privacyPolicyUrl": "/privacy-policy/",
    "cookiePolicyUrl": "/cookie-policy/",
    "panelAriaLabel": "Cookie preferences",
    "essentialTitle": "Essential cookies",
    "essentialDescription": "Always active to ensure the website works correctly.",
    "essentialBadge": "Active",
    "analyticsTitle": "Analytics",
    "analyticsDescription": "Browsing data collected in aggregate form for anonymous statistics.",
    "analyticsAriaLabel": "Enable Google Analytics",
    "titleReject": "Selected only",
    "titleAccept": "Accept all",
    "gaId": ""
}]
```


## Example

```html
<div pgs="hidden cookieConsent" pgs-option='cookieConsent[{
    "titleHeading": "Your privacy comes first",
    "description": "We use essential cookies to provide the service and, with your consent, analytics cookies from **Google Analytics** to measure traffic anonymously and improve our content.\nYou can change your choice at any time.",
    "privacyPolicyUrl": "/privacy-policy/",
    "cookiePolicyUrl": "/cookie-policy/",
    "gaId": "G-XXXXXXXXXX"
}]'></div>

<button type="button" pgs="button cookieConsent-actionOpen" aria-haspopup="dialog">
    <i class="fa-solid fa-cookie-bite"></i> Cookie preferences
</button>
```
