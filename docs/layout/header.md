<!-- File generato automaticamente da templates/html/layout/header.html. Modificare templates/html/layout/header.html e rieseguire npm run docs:generate. -->

# Header

Intestazione responsive che misura lo spazio disponibile, alterna contenuti desktop e mobile e integra menu, tema scuro e navigazione modale.

## PGS

- `header`: identifica l'intestazione principale osservata dal modulo JavaScript.
- `header-element`: identifica il gruppo interno misurato per determinare il passaggio alla modalità mobile.
- `header-element-alwaysOn`: identifica l'area iniziale sempre visibile.
- `header-element-onlyDesktop`: identifica i contenuti mostrati soltanto quando il menu desktop è attivo.
- `header-element-onlyMobile`: identifica i contenuti mostrati soltanto in modalità mobile.
- `header-element-alwaysOnLast`: identifica l'area finale sempre visibile.
- `header-element-hamburger`: identifica il gruppo della navigazione mobile.
- `header-element-hamburger-button`: identifica il controllo hamburger specifico dell'header.

## PGS Options

- `horizontal`: dispone orizzontalmente il menu desktop correlato.
- `vertical`: dispone verticalmente il menu mobile correlato.
- `menuHeader`: adatta entrambi i menu al contesto dell'header.
- `containerPGS`: sul wrapper modal usa containerPGS[header] per spostare il dialog nell'intestazione.
- `right`: sul dialog della navigazione mobile presenta il contenuto dal lato destro.

## PGS States

- `mobileActive`: viene applicato a header e header-element quando larghezza o viewport richiedono la navigazione mobile.

## Elementi correlati

- `logo`: inserisce il marchio nell'area iniziale.
- `logo-text`: usa la variante testuale del logo.
- `menu`: fornisce la navigazione desktop e mobile.
- `buttonIcon`: presenta i controlli tema e hamburger come pulsanti a icona.
- `toggleDarkmode`: collega il controllo al gestore globale del tema.
- `modal`: fornisce apertura e chiusura della navigazione mobile.
- `modal-button`: apre il pannello mobile.
- `modal-close`: chiude il pannello mobile e condivide il controllo hamburger.
- `modal-dialog`: identifica il dialog della navigazione mobile.
- `modal-dialog-content`: identifica il pannello interno della navigazione mobile.

## Output

Header HTML completo con navigazione desktop e pannello mobile laterale.

## Esempio

```html
<header pgs="header">
	<div pgs="header-element">
		<div pgs="header-element-alwaysOn">
			<a aria-label="Logo" pgs="logo" href="/">
				<span pgs="logo-text">MyPGS</span>
			</a>
		</div>

		<div pgs="header-element-onlyDesktop">
			<nav pgs="menu" pgs-option="horizontal menuHeader" aria-label="Menu principale">
				<ul>
					<li><a href="/">Home</a></li>
					<li><a href="#componenti">Componenti</a></li>
					<li><a href="#layout">Layout</a></li>
				</ul>
			</nav>
		</div>

		<div pgs="header-element-onlyMobile">
		</div>

		<div pgs="header-element-alwaysOnLast">
			<button pgs="buttonIcon toggleDarkmode" type="button" aria-label="Cambia tema">
				<i class="fa-solid fa-moon"></i>
			</button>
		</div>

		<div pgs="header-element-hamburger modal" pgs-option="containerPGS[header] ">

			<button pgs="buttonIcon modal-button modal-close header-element-hamburger-button" type="button"></button>

			<dialog pgs="modal-dialog" pgs-option="right">
				<div pgs="modal-dialog-content">
					<nav pgs="menu" pgs-option="vertical menuHeader" aria-label="Menu mobile">
						<ul>
							<li><a href="/">Home</a></li>
							<li><a href="#componenti">Componenti</a></li>
							<li><a href="#layout">Layout</a></li>
						</ul>
					</nav>
				</div>
			</dialog>
		</div>
	</div>

	<!-- //# HEADER BOTTOM -->

	<script>
		const addPgsState = (element, state) => {
			if (!element) return;

			const states = element.getAttribute("pgs-state")?.split(/\s+/) ?? [];
			element.setAttribute("pgs-state", [...new Set([...states, state])].join(" "));
		};

		if (localStorage.getItem("screenIsDarkMode") === "true") {
			addPgsState(document.documentElement, "darkmode");
			addPgsState(document.body, "darkmode");
		}

		if (window.innerWidth < 600) {
			addPgsState(document.querySelector("header"), "mobileActive");
			addPgsState(document.querySelector("[pgs~=header-element]"), "mobileActive");
		}
	</script>
</header>
```
