<!-- File generato automaticamente da templates/html/layout/body.html. Modificare templates/html/layout/body.html e rieseguire npm run docs:generate. -->

# Body

Documento HTML di base che abilita MyPGS, configura i metadati essenziali e applica al body le varianti condivise di sfondo, testo e titoli.

## PGS

- `htmlBase`: applica le regole fondamentali all'elemento html.
- `initP`: abilita gli stili di layout, componenti e pattern racchiusi nel namespace MyPGS.
- `bodyBase`: applica struttura e spaziatura di base al body.
- `bodyImg`: abilita le regole condivise per le immagini contenute nella pagina.
- `bodyText`: abilita tipografia e spaziatura del testo.
- `bodyHeading`: abilita la gerarchia tipografica dei titoli.

## PGS States

- `darkmode`: viene applicato dinamicamente a html e body per attivare il tema scuro.

## Output

Scheletro HTML completo necessario per inizializzare la libreria MyPGS.

## Esempio

```html
<!DOCTYPE html>
<html lang="it-IT" pgs="htmlBase initP">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<!-- Colori Browsers -->
	<meta name="theme-color" content="">
	<meta name="apple-mobile-web-app-status-bar-color" content="">

    <!-- Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

</head>

<body pgs="bodyBase bodyImg bodyText bodyHeading" >
```
