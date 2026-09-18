<!-- Automatically generated from reference/html/layout/header.html. Edit reference/html/layout/header.html and run npm run docs:generate again. -->

# Header

Responsive header that measures available space, switches between its full and compact content, and integrates menus, dark mode, and modal navigation.

## PGS

- `header`: identifies the main header observed by the JavaScript module.
- `header-element`: identifies the inner group measured to determine the switch to the compact layout.
- `header-element-alwaysOn`: identifies an area that stays visible in both layouts. Write it as many times as the header needs areas: the groups carry no styling of their own, so where each one lands is decided by document order alone.
- `header-element-onlyFull`: identifies content shown only in the full layout.
- `header-element-onlyCompact`: identifies content shown only in the compact layout.

## PGS Options (component brackets)

- `headerCompactBottom`: moves header-element to the bottom of the viewport while the header is compact, so it follows the chosen breakpoint.
- `headerCompactWatch`: forces the compact layout from the watch width down, even when the content still fits.
- `headerCompactMobile`: forces the compact layout from the mobile width down, even when the content still fits.
- `headerCompactBigMobile`: forces the compact layout from the big-mobile width down, even when the content still fits.
- `headerCompactTablet`: forces the compact layout from the tablet width down, even when the content still fits.
- `headerCompactBigTablet`: forces the compact layout from the big-tablet width down, even when the content still fits.
- `headerCompactLaptop`: forces the compact layout from the laptop width down, even when the content still fits.
- `headerScroll`: hides the header while scrolling down and shows it again while scrolling up.
- `headerPrimary`: marks the header that owns --heightOfHeader and --heightOfHeaderScroll, the properties that push the page content down. Only needed on a page with more than one header; without it the first one keeps them.

## PGS Data

- `headerCompactFrom`: forces the compact layout from a custom viewport width down, written as headerCompactFrom[600], and takes precedence over the named widths below.

## PGS States

- `compact`: is applied to header and header-element when their width or the viewport requires the compact layout.

## JavaScript API

- `pgs.header.init(root)`: initializes the headers inside the specified root, or the root itself when it is one; runs automatically on page load and again via pgs.init(root) for a header added later. A page may hold several headers, and each one manages its own compact layout, while the properties that push the page content down belong to the one marked headerPrimary, or to the first one when none is marked.

## Related elements

### PGS

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.
- `button`: provides the base styling for the header controls and for the navigation links, which the menu no longer styles on its own.
- `logo`: inserts the brand into the initial area.
- `logo-text`: uses the text variant of the logo.
- `menu`: provides both the full and the compact navigation.
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

### PGS Options (component brackets)

- `buttonTransparent`: the appearance of the navigation links, in the full-layout row and once they stack in the compact panel alike.
- `buttonHeader`: sizes a link like the other header controls; belongs to the button component.
- `buttonPaddingEqual`: sets the same padding on every side of a navigation link instead of the wider left/right default; belongs to the button component.
- `flexRow`: sets the horizontal direction inside the flex bracket.
- `nowrap`: uses the related nowrap component or utility in this example.
- `menuHorizontal`: arranges the full-layout menu horizontally.
- `menuVertical`: arranges the compact-layout menu vertically.
- `menuShort`: compacts adjacent full-layout menu links by overlapping their horizontal spacing.
- `modalRight`: presents the compact navigation dialog content from the right side.
- `buttonIcon`: presents theme and hamburger controls as icon buttons.
- `icon-bell`: the glyph on the control that opens the panel.
- `icon-hamburgerTwo`: draws the hamburger glyph, swapped for icon-close via CSS while the compact navigation is open.

### PGS Data

- `modalContainerPGS`: uses modalContainerPGS[header] on the modal wrapper to move the dialog into the header.

### Other

- `notifications`: identifies the scrollable list of notifications inside the dialog generated by pgs.notification.
- `icon-close`: drawn in place of icon-hamburgerTwo via CSS while the compact navigation is open; not written in this markup.

## CSS Variables

- `--header-background`
- `--header-color`
- `--header-compact-breakpoint`
- `--header-compactBottom-active`
- `--header-gap`
- `--header-padding-block`
- `--header-padding-inline`
- `--header-size`

## Output

Complete header HTML with full navigation and a side compact panel.
## Examples

### Header

Full navigation on the left, always-visible controls on the right, and the same links behind the hamburger once the header turns compact.

```html
<header pgs="header">
	<div pgs="header-element blur">
		<div pgs="header-element-alwaysOn">
			<a aria-label="Logo" pgs="logo" href="/">
				<span pgs="logo-text">MyPGS</span>
			</a>
		</div>

		<div pgs="header-element-onlyFull">
			<nav pgs="menu['menuHorizontal' 'menuShort']" aria-label="Main menu">
				<ul>
					<li><a pgs="button['buttonTransparent' 'buttonHeader' 'buttonPaddingEqual']" href="/">Home</a></li>
					<li><a pgs="button['buttonTransparent' 'buttonHeader' 'buttonPaddingEqual']" href="/services">Services</a></li>
					<li><a pgs="button['buttonTransparent' 'buttonHeader' 'buttonPaddingEqual']" href="/about">About</a></li>
					<li><a pgs="button['buttonTransparent' 'buttonHeader' 'buttonPaddingEqual']" href="/contact">Contact</a></li>
				</ul>
			</nav>
			<div pgs="flex['flexRow' 'nowrap']">
				<div pgs="modal" pgs-data="modalContainerPGS[header]">
					<button type="button" pgs="modal-button modal-close button['buttonIcon'] notificationBell" aria-label="Open notifications">
						<i pgs="icon['icon-bell']"></i>
						<span pgs="notificationBell-counter"></span>
					</button>
				</div>
				<button pgs="button['buttonIcon'] toggleDarkmode" type="button" aria-label="Change theme">
					<i pgs="icon"></i>
				</button>
			</div>
		</div>

		<div pgs="header-element-onlyCompact">
			<div pgs="flex['flexRow' 'nowrap']">
				<div pgs="modal" pgs-data="modalContainerPGS[header]">
					<button type="button" pgs="modal-button modal-close button['buttonIcon'] notificationBell" aria-label="Open notifications">
						<i pgs="icon['icon-bell']"></i>
						<span pgs="notificationBell-counter"></span>
					</button>
				</div>
				<button pgs="button['buttonIcon'] toggleDarkmode" type="button" aria-label="Change theme">
					<i pgs="icon"></i>
				</button>
				<div pgs="modal" pgs-data="modalContainerPGS[header]">

					<button pgs="button['buttonIcon'] modal-button modal-close" type="button" aria-label="Open menu">
						<i pgs="icon['icon-hamburgerTwo']" aria-hidden="true"></i>
					</button>

					<dialog pgs="modal-dialog['modalRight']">
						<div pgs="modal-dialog-content">
							<nav pgs="menu['menuVertical']" aria-label="Compact menu">
								<ul>
									<li><a pgs="button['buttonTransparent' 'buttonPaddingEqual']" href="/">Home</a></li>
									<li><a pgs="button['buttonTransparent' 'buttonPaddingEqual']" href="/services">Services</a></li>
									<li><a pgs="button['buttonTransparent' 'buttonPaddingEqual']" href="/about">About</a></li>
									<li><a pgs="button['buttonTransparent' 'buttonPaddingEqual']" href="/contact">Contact</a></li>
								</ul>
							</nav>
						</div>
					</dialog>
				</div>
			</div>
		</div>
	</div>
</header>
```
