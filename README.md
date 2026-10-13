# ivanmaggini.com

Sito personale di Ivan Maggini. Due cose in un posto solo: chi è e cosa sta
costruendo (Biglietto), e il servizio video per studi professionali e
aziende in tutta Italia (Ivan Maggini Studio).

Sono file statici: HTML, un foglio di stile e un carattere. Nessun build
step, nessuna dipendenza, nessun framework, nessun JavaScript. Si apre
`index.html` e c'è tutto.

## Pagine

| Rotta            | File                 | Cosa c'è                                |
| ---------------- | -------------------- | --------------------------------------- |
| `/`              | `index.html`         | La pagina di vendita dello Studio       |
| `/biglietto`     | `biglietto.html`     | Il prodotto, e il secondo progetto      |
| `/privacy`       | `privacy.html`       | Informativa privacy                     |
| `/condizioni`    | `condizioni.html`    | Condizioni generali di servizio         |
| `/en/`           | `en/index.html`      | La pagina dello Studio, in inglese      |
| `/en/biglietto`  | `en/biglietto.html`  | Il prodotto, in inglese                 |
| `/en/privacy`    | `en/privacy.html`    | Informativa privacy in inglese          |
| `/en/terms`      | `en/terms.html`      | Condizioni di servizio in inglese       |

Ogni pagina esiste in tutte e due le lingue: Studio lavora in tutta Italia e
presto anche all'estero. Le versioni inglesi dei testi legali sono
traduzioni, e in caso di differenze prevale l'italiano. I vecchi indirizzi
`/startup` e `/en/startup` reindirizzano alle pagine Biglietto, e `/studio`
e `/en/studio` alle home, che ora sono le pagine dello Studio.

## Il sistema visivo

Svizzero e minimale: una griglia rigorosa, un solo carattere, e una gerarchia
costruita con la dimensione e lo spazio bianco, senza decorazioni.

- **Griglia a dodici colonne, due assi.** Le etichette di sezione partono
  dalla colonna 1, tutto il contenuto dalla colonna 4. Il testo corrente
  occupa le colonne 4–9, circa sessanta caratteri, e le colonne 10–12
  restano vuote apposta. Niente è centrato.
- **Archivo**, a larghezza normale e in due pesi soli, 400 e 500. La
  differenza fra i due è piccola apposta: se un titolo non si distingue, lo
  distingue la dimensione. È ospitato sul sito, così per leggere una pagina
  il browser non contatta server di terzi. Licenza in
  `assets/fonts/OFL-archivo.txt`.
- **Sei dimensioni**: 13, 18, 24, 36, 64 px (e il testo a 16 su mobile). I
  gradini sono vicini in basso, dove si legge, e lontani in alto, dove si
  annuncia.
- **Carta**, `#ebebe8`: un grigio chiaro neutro, né il bianco dello schermo
  né una crema. È una scelta, non un'eredità.
- **Nero**, `#000000`, per il testo e per il campo nero. **Grigio**,
  `#5e5e5a` (5,45:1 sulla carta), per il testo secondario.
- **Ambra**, `#ffab00`, solo sul nero e solo per l'azione della pagina,
  cioè l'indirizzo email. Sulla carta non passerebbe il contrasto.
- **Un campo nero per pagina**, dove si agisce: il contatto.
- **Niente card.** I contenuti paralleli (i tre pubblici di Studio, i tre
  passi) sono colonne con un filetto in testa, nient'altro.
- **Le pagine legali hanno lo stesso impianto di quelle di vendita.** Il
  numero di ogni paragrafo sta appeso sull'asse sinistro.

## Il movimento

Un solo momento per pagina, all'apertura, e tutto in CSS. In home il filetto
fra le due righe si traccia da sinistra e scopre il testo che ha sotto;
nelle altre pagine il titolo viene scoperto da sinistra, cioè dall'asse da
cui parte. Il movimento mostra la griglia invece di aggiungerci qualcosa
sopra: niente dissolvenze, niente rimbalzi, una sola curva.

Al passaggio del mouse non si sposta niente: cambia solo lo spessore di una
sottolineatura. Niente è legato allo scroll. Con
`prefers-reduced-motion: reduce` non si muove nulla, e da fermo ogni pagina
è completa.

## Nessun modulo

Sul sito non c'è nessun form. L'unica azione possibile è scrivere a
`general@ivanmaggini.com`. È una scelta: senza raccolta non ci sono dati da
custodire, e l'informativa privacy si accorcia di conseguenza.

## Pubblicazione

Deploy su Netlify dal branch `main`, senza build. `netlify.toml` tiene gli
URL puliti, i reindirizzamenti delle vecchie rotte, il 404 separato per le
pagine inglesi e le intestazioni di sicurezza.

**Il foglio di stile si richiama con l'impronta del suo contenuto
nell'indirizzo** (`/assets/site.css?v=...`). Non è un vezzo: senza, un
browser che ha in cache la versione precedente continua a servirla, e se nel
frattempo sono cambiati i nomi delle classi la pagina esce senza stile. Dopo
ogni modifica a `assets/site.css` va rigenerata l'impronta in tutte le
pagine:

```
python3 - <<'EOF'
import hashlib, re
from pathlib import Path
css = hashlib.sha256(Path('assets/site.css').read_bytes()).hexdigest()[:10]
for f in Path('.').glob('**/*.html'):
    t = f.read_text(encoding='utf-8')
    t = re.sub(r'href="/assets/site\.css(\?v=[0-9a-f]+)?"', f'href="/assets/site.css?v={css}"', t)
    f.write_text(t, encoding='utf-8')
print(css)
EOF
```

Gli asset sono comunque dichiarati `max-age=0, must-revalidate`: è la seconda
rete, per il giorno in cui l'impronta non venisse rigenerata.

## Lavorarci

```
python3 -m http.server 8000
```

Basta per leggere il contenuto. Per provare le rotte pulite (`/biglietto` invece
di `/biglietto.html`) serve un server che applichi le riscritture di
`netlify.toml`, oppure `netlify dev`.
