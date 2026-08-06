<!-- Automatically generated from reference/html/layout/header.html. Edit reference/html/layout/header.html and run npm run docs:generate again. -->

# Header

Responsive header that measures available space, switches between desktop and mobile content, and integrates menus, dark mode, and modal navigation.

## PGS

- `header`: identifies the main header observed by the JavaScript module.
- `header-element`: identifies the inner group measured to determine the switch to mobile mode.
- `header-element-alwaysOn`: identifies the initial area that is always visible.
- `header-element-onlyDesktop`: identifies content shown only while the desktop menu is active.
- `header-element-onlyMobile`: identifies content shown only in mobile mode.
- `header-element-alwaysOnLast`: identifies the final area that is always visible.
- `header-element-hamburger`: identifies the mobile navigation group.
- `header-element-hamburger-button`: identifies the header-specific hamburger control.

## PGS Options

- `mobileBottom`: moves header-element to the bottom of the viewport at the mobile breakpoint.
- `horizontal`: arranges the related desktop menu horizontally.
- `vertical`: arranges the related mobile menu vertically.
- `menuHeader`: adapts both menus to the header context.
- `menuShort`: compacts adjacent desktop menu links by overlapping their horizontal spacing.
- `containerPGS`: uses containerPGS[header] on the modal wrapper to move the dialog into the header.
- `right`: presents the mobile navigation dialog content from the right side.
- `buttonIcon`: presents theme and hamburger controls as icon buttons.

## PGS States

- `mobileActive`: is applied to header and header-element when their width or the viewport requires mobile navigation.

## Related elements

- `button`: provides the base styling for header controls.
- `logo`: inserts the brand into the initial area.
- `logo-text`: uses the text variant of the logo.
- `menu`: provides desktop and mobile navigation.
- `toggleDarkmode`: connects the control to the global theme handler.
- `modal`: provides opening and closing behavior for mobile navigation.
- `modal-button`: opens the mobile panel.
- `modal-close`: closes the mobile panel and shares the hamburger control.
- `modal-dialog`: identifies the mobile navigation dialog.
- `modal-dialog-content`: identifies the inner mobile navigation panel.

## Output

Complete header HTML with desktop navigation and a side mobile panel.

## Example

```html
<header pgs="header">
	<div pgs="header-element">
		<div pgs="header-element-alwaysOn">
			<a aria-label="Logo" pgs="logo" href="/">
				<span pgs="logo-text">MyPGS</span>
			</a>
		</div>

		<div pgs="header-element-onlyDesktop">
			<nav pgs="menu" pgs-option="horizontal menuHeader menuShort" aria-label="Main menu">
				<ul>
					<li><a href="/">Home</a></li>
					<li><a href="#components">Components</a></li>
					<li><a href="#layout">Layout</a></li>
				</ul>
			</nav>
		</div>

		<div pgs="header-element-onlyMobile">
		</div>

		<div pgs="header-element-alwaysOnLast">
			<button pgs="button toggleDarkmode" pgs-option="buttonIcon" type="button" aria-label="Change theme">
				<i class="fa-solid fa-moon"></i>
			</button>
		</div>

		<div pgs="header-element-hamburger modal" pgs-option="containerPGS[header] ">

			<button pgs="button modal-button modal-close header-element-hamburger-button" pgs-option="buttonIcon" type="button"></button>

			<dialog pgs="modal-dialog" pgs-option="right">
				<div pgs="modal-dialog-content">
					<nav pgs="menu" pgs-option="vertical menuHeader" aria-label="Mobile menu">
						<ul>
							<li><a href="/">Home</a></li>
							<li><a href="#components">Components</a></li>
							<li><a href="#layout">Layout</a></li>
						</ul>
					</nav>
				</div>
			</dialog>
		</div>
	</div>
</header>
```
