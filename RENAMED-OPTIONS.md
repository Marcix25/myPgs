# pgs-option rename — nomi precedenti vs nuovi

Opzioni `pgs-option` che appartenevano a un solo componente ma non ne portavano il nome nel
token, rinominate per coerenza con il resto della libreria (es. `singleScroll` → `slidesSingleScroll`).

| Componente | Prima | Ora |
| --- | --- | --- |
| Slides | `singleScroll` | `slidesSingleScroll` |
| Slides | `shadowDesktop` | `slidesShadowDesktop` |
| Slides | `notScrollWithMouse` | `slidesNotScrollWithMouse` |
| Slides | `slideAnimationScale` | `slidesAnimationScale` |
| Step tabs | `tabIcon` | `stepTabsIcon` |
| Page shell | `shellAsideScroll` | `pageShellAsideScroll` |
| Page shell | `shellAsideScrollFlush` | `pageShellAsideScrollFlush` |
| Page shell | `shellFullPage` | `pageShellFullPage` |
| Menu | `horizontal` | `menuHorizontal` |
| Menu | `vertical` | `menuVertical` |
| Dropdown (anche uso interno di Menu sul submenu a comparsa) | `position` | `dropdownPosition` |
| Modal | `containerID` | `modalContainerID` |
| Modal | `containerPGS` | `modalContainerPGS` |
| Modal | `disableBackdropClose` | `modalDisableBackdropClose` |
| Modal | `history` | `modalHistory` |
| Modal | `left` | `modalLeft` |
| Modal (anche riuso nel dialog di Notification) | `right` | `modalRight` |
| Modal | `topLevel` | `modalTopLevel` |
| Header | `compactBottom` | `headerCompactBottom` |

## Non toccati (di proposito)

Questi comparivano associati a più componenti nella mappa (`reference/pgs-map.json`) solo perché
usati nei relativi esempi/markup generato, ma appartengono davvero a un altro componente e sono già
nominati coerentemente con quello:

- `buttonReverse`, `buttonNohover` → famiglia del componente **button**.
- `icon-*` (es. `icon-moon`, `icon-sun`) e `iconDuo-hamburger` → famiglia del componente **icon**.
- Le famiglie condivise apposta tra più componenti: `border*`, `margin*`, `padding*`,
  `flex*`/`grid` (contentX/itemX/justifyX/gapX), `notification`/`toast` (usati da
  `notificationTrigger`/`notificationLoad`/`toastLoad`).

## Dove ho già applicato le modifiche

- **myPgs** (sorgente): `assets/javascript`, `assets/scss`, `reference/html`, `reference/react`,
  `demo/`, `AGENTS-USAGE.md`, `docs/helper/pgs.md`, `scripts/generate-component-docs.js`.
  `reference/pgs-map.json` e `docs/**/*.md` sono stati rigenerati con
  `node scripts/generate-pgs-map.js` e `npm run docs:generate` (0 errori di validazione).
  `dist/` ricompilato con `npm run start`.
- **`migration.md`**: aggiunta una nuova sezione "Option names now prefixed with their component"
  con la stessa tabella, più una riga di grep nella sezione "sweep da eseguire sul progetto" per
  trovare eventuali usi rimasti in altri progetti.
- **PGS_theme** (tema di sviluppo, collegato a myPgs via `npm link`): aggiornati gli usi reali
  trovati in `blocs/bl-slides.php`, `blocs/bl-modals.php` (×3), `blocs/bl-gallery.php`,
  `modules/md-header.php` (×2). `dist/` ricompilato con `npm run start`.
- **PGS_plugin**: nessun uso di `pgs-option` nel codice, nessuna modifica necessaria.

## I tre siti WordPress — sono child theme di PGS_theme, aggiornati anche loro

Correzione rispetto alla prima versione di questo file: `pgsnew25`, `social-economy` e `ludosport`
sono child theme WordPress di PGS_theme (`Template: PGS_theme` in `style.css`, con
`get_template_directory()` che punta sempre a PGS_theme). Il CSS/JS che serve davvero quei siti è
quindi quello compilato di PGS_theme (già aggiornato e ricompilato), non la copia di `mypgs`
vendorizzata nel loro `node_modules` (quella è irrilevante a runtime, restava solo ferma a versioni
vecchie). Ho quindi cercato e rinominato gli usi reali anche nei tre child theme:

- **social-economy**: `header-footer.php` (`containerID[myHeader]` → `modalContainerID[myHeader]`,
  `pgs-option="right"` → `modalRight`), `page/home.php` (`shadowDesktop` → `slidesShadowDesktop`),
  `functions/fn-menu.php` (`pgs-option="vertical"` → `menuVertical`).
- **ludosport**: `page/offer.php` (`disableBackdropClose` → `modalDisableBackdropClose`,
  `containerID[camp_period-containerModal]` → `modalContainerID[...]`), `page/bookingForm.php`
  (`tabIcon[fa-mountain-city]` → `stepTabsIcon[...]`, `disableBackdropClose` →
  `modalDisableBackdropClose`), `modules/md-tab/md-tab-atlethe.php`,
  `modules/md-tab/md-tab-camp.php`, `modules/md-tab/md-tab-complete.php` (ognuno il proprio
  `tabIcon[...]` → `stepTabsIcon[...]`).
- **pgsnew25**: nessun uso di questi token nel suo codice, nessuna modifica necessaria.

Verificato con una ricerca finale su tutti e tre i temi: zero occorrenze rimaste dei nomi vecchi.
