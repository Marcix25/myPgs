<?php
//# HEADER
function PGS_md_header() { ?>
	<header pgs="header">
		<div pgs="header-element">
			<div pgs="header-element-alwaysOn">
				<?php do_action("PGS_headerTop_contentAlwaysOn_action") ?>
			</div>

			<div pgs="header-element-onlyDesktop">
				<?php do_action("PGS_headerTop_contentOnlyDesktop_action") ?>
			</div>

			<div pgs="header-element-onlyMobile">
				<?php do_action("PGS_headerTop_contentOnlyMobile_action") ?>
			</div>

			<div pgs="header-element-alwaysOnLast">
				<?php do_action("PGS_headerTop_contentAlwaysOnLast_action") ?>
			</div>

			<div pgs="header-element-hamburger modal" pgs-option="containerPGS[header] ">

				<?php if (has_action("PGS_headerMobileDialog_action")) { ?>
					<button pgs="buttonIcon modal-button modal-close header-element-hamburger-button" type="button">

					</button>

					<dialog pgs="header-mobile-dialog" pgs-option="right ">
						<div pgs="modal-dialog-content header-mobile-content">
							<?php do_action("PGS_headerMobileDialog_action"); ?>
						</div>
					</dialog>
				<?php }; ?>
			</div>
		</div>

		<!-- //# HEADER BOTTOM -->
		<?php do_action("PGS_headerBottom_action"); ?>

		<script>
			if (localStorage.getItem("screenIsDarkMode") === "true") {
				document.body.classList.add("darkmode");
				document.querySelector(":root").setAttribute("data-darkmode", "true");
				document.body.setAttribute("data-darkmode", "true");
			}
			
			if (window.innerWidth < 600) {
				document.querySelector("header").setAttribute("data-header-mobileActive", "true");
				document.querySelector("[pgs~=header-element]").setAttribute("data-header-mobileActive", "true");
			}
		</script>
	</header>
<?php }; ?>