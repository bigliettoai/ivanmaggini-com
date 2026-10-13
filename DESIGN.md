---
name: ivanmaggini.com
description: Sito personale di Ivan Maggini, impianto svizzero su carta grigia, un solo carattere e un solo colore d'azione.
colors:
  nero: "#000000"
  carta: "#ebebe8"
  grigio: "#5e5e5a"
  grigio-su-nero: "#8a8a86"
  ambra: "#ffab00"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "64px"
    fontWeight: 500
    lineHeight: "64px"
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "36px"
    fontWeight: 500
    lineHeight: "40px"
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: "32px"
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: "32px"
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: "28px"
    fontFeature: "tnum"
  label:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: "20px"
    letterSpacing: "0.01em"
rounded:
  none: "0px"
spacing:
  s1: "8px"
  s2: "16px"
  s3: "24px"
  s4: "40px"
  s5: "64px"
  s6: "clamp(80px, 10vw, 128px)"
components:
  button-primary:
    backgroundColor: "{colors.nero}"
    textColor: "{colors.carta}"
    rounded: "{rounded.none}"
    padding: "14px 20px"
  button-primary-hover:
    backgroundColor: "{colors.carta}"
    textColor: "{colors.nero}"
  button-ghost:
    backgroundColor: "{colors.carta}"
    textColor: "{colors.nero}"
    rounded: "{rounded.none}"
    padding: "14px 20px"
  button-ghost-hover:
    backgroundColor: "{colors.nero}"
    textColor: "{colors.carta}"
  button-board:
    backgroundColor: "{colors.ambra}"
    textColor: "{colors.nero}"
    rounded: "{rounded.none}"
    padding: "14px 20px"
  board:
    backgroundColor: "{colors.nero}"
    textColor: "{colors.carta}"
    padding: "{spacing.s6} 0"
  mailto:
    textColor: "{colors.ambra}"
    typography: "{typography.headline}"
  rail:
    textColor: "{colors.grigio}"
    typography: "{typography.label}"
---

# Design System: ivanmaggini.com

## Overview

**Creative North Star: "Il foglio di lavoro"**

Il sito è un foglio da tipografo svizzero lasciato sul tavolo: la griglia si
vede, i due assi verticali reggono tutto, e non c'è nessun ornamento. Il
rigore è la personalità. Ogni pagina, compresi i testi legali, sta sulla
stessa griglia a dodici colonne. La gerarchia la fanno la dimensione e lo
spazio bianco, mai il peso o il colore.

La densità è bassa: lo spazio fra due sezioni è molto più grande di quello
dentro una sezione, ed è lui a dire dove finisce un discorso. La carta è un
grigio chiaro neutro scelto apposta, né il bianco dello schermo né una
crema. Il nero è pieno. L'unico colore, l'ambra, compare solo sul campo
nero e solo sull'azione.

Il movimento è uno per pagina, all'apertura, e mostra la griglia invece di
aggiungerci qualcosa: un filetto che si traccia, un titolo scoperto da
sinistra. Sono rifiutati esplicitamente gli effetti da template ("vibe
coded") e il nome gigante in apertura della home come gesto standard dei
siti personali.

**Key Characteristics:**
- Griglia a dodici colonne con due assi: etichette dalla colonna 1, contenuto dalla colonna 4.
- Un solo carattere, Archivo, in due pesi (400 e 500).
- Carta grigia, nero pieno, ambra solo sul nero.
- Un solo campo nero per pagina, dove si agisce.
- Angoli vivi, nessuna ombra, nessuna card.
- Un solo momento animato, all'apertura, solo in CSS.

## Colors

Una palette di carta e inchiostro, con un solo segnale.

### Primary
- **Ambra segnale** (`ambra`): il colore dell'azione. Lo portano l'indirizzo email nel campo nero e il pulsante dentro il campo nero, e nient'altro. Sul nero ha 11:1; sulla carta farebbe 1,6:1, ed è questo vincolo a tenerlo al suo posto.

### Neutral
- **Carta da disegno** (`carta`): il fondo di ogni pagina e della barra in alto, e il testo sul campo nero. Il nero pieno ci sta sopra a 17,6:1.
- **Inchiostro** (`nero`): testo, filetti, pulsanti, campo nero, anello di focus.
- **Grafite** (`grigio`): testo secondario, etichette di sezione, indirizzo nel piede, lingua non attiva. 5,45:1 sulla carta.
- **Grafite su nero** (`grigio-su-nero`): lo stesso ruolo del grigio, ma dentro il campo nero, dove il grigio della carta non passerebbe. 6,06:1.

### Named Rules
**La regola del segnale.** L'ambra compare solo sul campo nero e solo sull'azione della pagina. Se c'è ambra sulla carta, è un errore.

**La regola del colore come informazione.** Niente fondi alternati, niente grigi decorativi, niente tinte di sezione. Il colore dice dove si agisce, e basta.

## Typography

**Display Font:** Archivo a larghezza normale (con Helvetica Neue, Helvetica, Arial)
**Body Font:** Archivo (stesso carattere)

**Character:** Un grottesco asciutto, ospitato sul sito e ridotto ai caratteri latini. La differenza fra 400 e 500 è piccola apposta: se un titolo non si distingue, lo distingue la dimensione. Cifre tabellari ovunque, così date, partita IVA e numeri dei paragrafi si incolonnano.

### Hierarchy
Interlinee a multipli di 4. Sotto i 760 px ogni gradino scende di uno.
- **Display** (500, 64/64, su mobile 40/44, −0,03em): l'h1 di ogni pagina e le righe dell'apertura della home.
- **Headline** (500, 36/40, su mobile 28/32, −0,02em): i titoli di sezione (h2) e l'indirizzo email nel campo nero.
- **Title** (500, 24/32, su mobile 20/28, −0,01em): h3, titoli delle colonne parallele, domande.
- **Lede** (400, 24/32, su mobile 20/28): il paragrafo d'apertura sotto un titolo, largo al massimo sei colonne.
- **Body** (400, 18/28, su mobile 16/24): il testo corrente, al massimo 38em, cioè circa sessanta caratteri. Nelle colonne parallele scende a 16/24.
- **Label** (400, 13/20, +0,01em): etichette di sezione sull'asse sinistro, note, piede. In tondo minuscolo, mai in maiuscoletto.

La barra di navigazione usa 14 px (15 da 560 px) in peso 500, e il pulsante 16/20 in peso 500. Sono le uniche dimensioni fuori scala.

### Named Rules
**La regola della dimensione.** Due pesi soli. Un titolo si distingue con la dimensione, mai con il grassetto, il colore o il maiuscolo.

## Layout

La griglia ha dodici colonne con un margine fluido (`clamp(20px, 5.5vw, 64px)`) e una larghezza massima di 1240 px. Il gutter è di 16 px, e di 24 px da 940 px in su.

- **Asse A**, inizio della colonna 1: etichette di sezione, numeri dei paragrafi legali, marchio nella barra e nel piede.
- **Asse B**, inizio della colonna 4: tutto il contenuto. Il testo corrente occupa le colonne 4–9; le colonne 10–12 restano vuote, ed è voluto. Niente è centrato.
- Ogni sezione è un blocco con un filetto nero in testa e `s6` sopra e sotto (80–128 px). Dentro una sezione le distanze sono `s3` (24 px), più `s2` prima di elenchi, colonne e pulsanti (40 px in tutto). Si usano solo i passi da `s1` a `s6`.
- L'etichetta e la prima riga del contenuto stanno sulla stessa linea di base.
- Sotto i 940 px la griglia collassa in una colonna sola, e l'etichetta va sopra il contenuto.
- Barra in alto fissa, alta 56 px, sulla stessa griglia: marchio sull'asse A, navigazione dall'asse B, lingue in fondo a destra.

**La regola dei due assi.** Ogni elemento parte dall'asse A o dall'asse B. Un terzo punto di partenza è un errore.

## Elevation & Depth

Il sistema è piatto. Non c'è nessuna ombra, nessuna sfumatura e nessun livello sovrapposto. La profondità non esiste: la struttura la danno i filetti neri da 1 px e l'unico ribaltamento di fondo, il campo nero. La barra in alto resta fissa con lo stesso fondo carta e un filetto sotto, senza ombra.

**La regola del foglio.** Se un elemento sembra sollevato dalla carta, è sbagliato.

## Shapes

Angoli vivi ovunque (0 px): pulsanti, campo nero, anello di focus. Le forme sono rettangoli e linee. I filetti sono neri e da 1 px; l'unico filetto grigio separa le domande. Gli elenchi usano un trattino appeso in grigio, come in un elenco battuto a macchina. La croce delle domande è fatta di due tratti da 2 px, che ruotando diventano un meno.

## Components

Esatti e asciutti: niente si sposta. Al passaggio del mouse cambia lo spessore di una riga o si inverte un colore, e nient'altro. Tutte le transizioni usano una curva sola, `cubic-bezier(0.2, 0, 0, 1)`, e durano 0,15 s (0,3 s per le domande).

### Buttons
- **Shape:** angoli vivi (0 px), bordo da 1 px dello stesso colore del fondo.
- **Primary:** inchiostro pieno con testo carta, 16/20 in peso 500, padding 14 × 20 px.
- **Hover / Focus:** al passaggio il fondo diventa trasparente e il testo nero: è un'inversione, non un movimento. Il focus è un contorno nero da 2 px a 3 px di distanza, ambra dentro il campo nero.
- **Ghost:** trasparente con testo nero; al passaggio si riempie di nero.
- **Nel campo nero:** fondo ambra e testo nero; al passaggio diventa trasparente con testo ambra.

### Links
- Sottolineatura da 1 px a 0,18em dal testo, che al passaggio diventa da 2 px. Nient'altro cambia: niente frecce né colori.

### Cards / Containers
- Le card non ci sono. I contenuti paralleli (i tre pubblici, i passi) sono **colonne pure**: un filetto nero in testa, 16 px di distanza, titolo, testo, link in fondo. Tre colonne affiancate da 940 px, una sopra l'altra sotto.

### Navigation
- Una barra fissa su carta con un filetto sotto. Il marchio "Ivan Maggini" è in peso 500. Le voci sono in 14–15 px, peso 500, senza sottolineatura: la pagina corrente e il passaggio la mostrano. Le lingue sono in grafite, quella corrente in nero e senza sottolineatura.

### Il campo nero (signature)
- Un solo blocco a fondo inchiostro per pagina, quello del contatto, con `s6` sopra e sotto. Dentro: etichetta in grafite su nero, titolo in carta, e l'indirizzo email in ambra segnale a 36/40 (24/32 su mobile), sottolineato a 2 px e a 4 px al passaggio. È l'azione della pagina.

### Etichetta di sezione (rail)
- 13/20 sull'asse A, allineata alla linea di base della prima riga del contenuto. La prima riga è in grafite e nomina la sezione; la seconda, in `<b>`, è in nero e peso 500 e dà un dettaglio. Quando l'etichetta è l'unico titolo della sezione è un `h2` con il solo `<b>`, e conserva l'aspetto dell'etichetta.

### Righe dell'apertura (home)
- I due mestieri in dimensione display, uno per riga, con la parola chiave sottolineata a 2 px (4 px al passaggio). Fra le due righe c'è un filetto che all'apertura si traccia da sinistra e scopre il testo sotto.

### Domande
- Un filetto nero in testa e uno grigio fra le voci. La domanda è in dimensione title, con una croce a due tratti a destra. L'altezza scorre dove il browser lo supporta; altrove la risposta compare e basta.

### Paragrafi legali
- Stessa griglia delle pagine di vendita. Il numero del paragrafo è appeso sull'asse A, il titolo sull'asse B, con un filetto sopra ogni h2.

## Do's and Don'ts

### Do:
- **Do** far partire ogni elemento dall'asse A (colonna 1) o dall'asse B (colonna 4), e lasciare vuote le colonne 10–12 accanto al testo corrente.
- **Do** distinguere i titoli con la dimensione, usando solo i pesi 400 e 500 di Archivo.
- **Do** usare solo i passi `s1`…`s6` e i colori definiti in `:root`.
- **Do** tenere uno e un solo campo nero per pagina, sul contatto, con l'azione in ambra segnale.
- **Do** limitare il movimento a un solo momento all'apertura (`.riga` in home, `.scopri` altrove), in CSS, con la curva unica, e fermarlo del tutto con `prefers-reduced-motion`.
- **Do** dare ai contenuti paralleli la forma di colonne con un filetto in testa.

### Don't:
- **Don't** usare l'ambra sulla carta, né come decorazione.
- **Don't** usare card, ombre, angoli arrotondati, sfumature o fondi alternati.
- **Don't** centrare niente.
- **Don't** aggiungere animazioni legate allo scroll, dissolvenze, rimbalzi o elementi che si spostano al passaggio del mouse.
- **Don't** usare il maiuscolo o il grassetto per creare gerarchia.
- **Don't** aprire la home con il nome in grande: si parte da cosa fa Ivan.
- **Don't** caricare caratteri, script o immagini da server di terzi.
