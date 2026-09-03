<!-- Automatically generated from reference/html/layout/header.html. Edit reference/html/layout/header.html and run npm run docs:generate again. -->

# Header

Responsive header that measures available space, switches between its full and compact content, and integrates menus, dark mode, and modal navigation.

## PGS

- `header`: identifies the main header observed by the JavaScript module.
- `header-element`: identifies the inner group measured to determine the switch to the compact layout.
- `header-element-alwaysOn`: identifies the initial area that is always visible.
- `header-element-onlyFull`: identifies content shown only in the full layout.
- `header-element-onlyCompact`: identifies content shown only in the compact layout.
- `header-element-alwaysOnLast`: identifies the final area that is always visible.
- `header-element-hamburger`: identifies the compact navigation group.
- `header-element-hamburger-button`: identifies the header-specific hamburger control.

## PGS Options

- `headerCompactBottom`: moves header-element to the bottom of the viewport while the header is compact, so it follows the chosen breakpoint.
- `headerScroll`: hides the header while scrolling down and shows it again while scrolling up.
- `headerCompact`: forces the compact layout at a custom viewport width with the syntax headerCompact[600], and takes precedence over the named widths below.
- `headerCompactWatch`: forces the compact layout from the watch width down, even when the content still fits.
- `headerCompactMobile`: forces the compact layout from the mobile width down, even when the content still fits.
- `headerCompactBigMobile`: forces the compact layout from the big-mobile width down, even when the content still fits.
- `headerCompactTablet`: forces the compact layout from the tablet width down, even when the content still fits.
- `headerCompactBigTablet`: forces the compact layout from the big-tablet width down, even when the content still fits.
- `headerCompactLaptop`: forces the compact layout from the laptop width down, even when the content still fits.
- `headerPrimary`: marks the header that owns --heightOfHeader and --heightOfHeaderScroll, the properties that push the page content down. Only needed on a page with more than one header; without it the first one keeps them.

## PGS States

- `compact`: is applied to header and header-element when their width or the viewport requires the compact layout.

## JavaScript API

- `pgs.header.init(root)`: initializes the headers inside the specified root, or the root itself when it is one; runs automatically on page load and again via pgs.init(root) for a header added later. A page may hold several headers, and each one manages its own compact layout, while the properties that push the page content down belong to the one marked headerPrimary, or to the first one when none is marked.

## Related elements

### PGS

- `button`: provides the base styling for the header controls and for the navigation links, which the menu no longer styles on its own.
- `logo`: inserts the brand into the initial area.
- `logo-text`: uses the text variant of the logo.
- `menu`: provides both the full and the compact navigation.
- `flexRow`: uses the related flexRow component or utility in this example.
- `nowrap`: uses the related nowrap component or utility in this example.
- `blur`: applies a backdrop blur behind header-element for a frosted-glass effect.
- `notificationBell`: opens and closes the notification panel from the header.
- `notificationBell-counter`: displays the current notification count on the bell.
- `toggleDarkmode`: connects the control to the global theme handler.
- `modal`: provides opening and closing behavior for the compact navigation.
- `modal-button`: opens the compact panel.
- `modal-close`: closes the compact panel and shares the hamburger control.
- `modal-dialog`: identifies the compact navigation dialog.
- `modal-dialog-content`: identifies the inner compact navigation panel; also identifies the JS-generated content area wrapping notifications inside the notification dialog.
- `icon`: draws the glyphs this example shows; see Icon for the whole set.

### PGS Options

- `buttonText`: the appearance of the navigation links, in the full-layout row and once they stack in the compact panel alike.
- `buttonHeader`: sizes a link like the other header controls; belongs to the button component.
- `buttonPaddingEqual`: sets the same padding on every side of a navigation link instead of the wider left/right default; belongs to the button component.
- `menuHorizontal`: arranges the full-layout menu horizontally.
- `menuVertical`: arranges the compact-layout menu vertically.
- `menuShort`: compacts adjacent full-layout menu links by overlapping their horizontal spacing.
- `modalContainerPGS`: uses modalContainerPGS[header] on the modal wrapper to move the dialog into the header.
- `modalRight`: presents the compact navigation dialog content from the right side.
- `buttonIcon`: presents theme and hamburger controls as icon buttons.
- `icon-bell`: the glyph on the control that opens the panel.
- `icon-hamburgerTwo`: draws the hamburger glyph, swapped for icon-close via CSS while the compact navigation is open.

### Other

- `modal-dialogpopover`: identifies the popover variant of the dialog, which the header styles like the standard one.
- `notifications`: identifies the scrollable list of notifications inside the dialog generated by pgs.notification.
- `icon-close`: drawn in place of icon-hamburgerTwo via CSS while the compact navigation is open; not written in this markup.

## Output

Complete header HTML with full navigation and a side compact panel.

## Example

```html
<header pgs="header" demo="component" demo-title="Header" demo-description="Full navigation on the left, always-visible controls on the right, and the same links behind the hamburger once the header turns compact.">
	<div pgs="header-element blur">
		<div pgs="header-element-alwaysOn">
			<a aria-label="Logo" pgs="logo" href="/">
				<span pgs="logo-text">MyPGS</span>
			</a>
		</div>

		<div pgs="header-element-onlyFull">
			<nav pgs="menu" pgs-option="menuHorizontal menuShort" aria-label="Main menu">
				<ul>
					<li><a pgs="button" pgs-option="buttonText buttonHeader buttonPaddingEqual" href="/">Home</a></li>
					<li><a pgs="button" pgs-option="buttonText buttonHeader buttonPaddingEqual" href="/services">Services</a></li>
					<li><a pgs="button" pgs-option="buttonText buttonHeader buttonPaddingEqual" href="/about">About</a></li>
					<li><a pgs="button" pgs-option="buttonText buttonHeader buttonPaddingEqual" href="/contact">Contact</a></li>
				</ul>
			</nav>
		</div>

		<div pgs="header-element-onlyCompact">
		</div>

		<div pgs="header-element-alwaysOnLast">
			<div pgs="flexRow nowrap">
				<div pgs="modal" pgs-option="modalContainerPGS[header] ">
					<button type="button" pgs="modal-button modal-close button notificationBell" pgs-option="buttonIcon" aria-label="Open notifications">
						<i pgs="icon" pgs-option="icon-bell"></i>
						<span pgs="notificationBell-counter"></span>
					</button>
				</div>
				<button pgs="button toggleDarkmode" pgs-option="buttonIcon" type="button" aria-label="Change theme">
					<i pgs="icon"></i>
				</button>
			</div>
		</div>

		<div pgs="header-element-hamburger modal" pgs-option="modalContainerPGS[header]">

			<button pgs="button modal-button modal-close header-element-hamburger-button" pgs-option="buttonIcon" type="button" aria-label="Open menu">
				<i pgs="icon" pgs-option="icon-hamburgerTwo" aria-hidden="true"></i>
			</button>

			<dialog pgs="modal-dialog" pgs-option="modalRight">
				<div pgs="modal-dialog-content">
					<nav pgs="menu" pgs-option="menuVertical" aria-label="Compact menu">
						<ul>
							<li><a pgs="button" pgs-option="buttonText buttonPaddingEqual" href="/">Home</a></li>
							<li><a pgs="button" pgs-option="buttonText buttonPaddingEqual" href="/services">Services</a></li>
							<li><a pgs="button" pgs-option="buttonText buttonPaddingEqual" href="/about">About</a></li>
							<li><a pgs="button" pgs-option="buttonText buttonPaddingEqual" href="/contact">Contact</a></li>
						</ul>
					</nav>
				</div>
			</dialog>
		</div>
	</div>
</header>
```
