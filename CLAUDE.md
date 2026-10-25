# CLAUDE.md

Sito personale di Ivan Maggini, ivanmaggini.com. È tutto statico: HTML scritto
a mano, un foglio di stile e un carattere ospitato sul sito. Non ci sono
build, dipendenze, framework né JavaScript. Il deploy va su Netlify dal branch
`main`, e la cartella del repository viene pubblicata così com'è
(`publish = "."`).

Il README spiega il perché delle scelte visive e tecniche. Questo file dice
come si lavora sul sito senza rompere niente.

## File

| File | A cosa serve |
| --- | --- |
| `index.html` | Home IT, la pagina personale: benvenuto breve, tre porte, poi "Chi sono" (`#chi-sono`): introduzione, le due foto affiancate in un solo blocco, poi il testo lungo in colonna unica |
| `studio.html` | La pagina di vendita di Ivan Maggini Studio (`/studio`): è l'indirizzo da usare nelle mail ai clienti |
| `avvocati.html` | La pagina dello Studio per avvocati e studi legali (`/avvocati`), solo in italiano: il metodo in quattro passi, la deontologia, le condizioni. **In preparazione**: `noindex`, nessun link da menu o piede, fuori dalla sitemap |
| `PUBBLICAZIONE.md` | Cosa cambiare il giorno in cui `/avvocati` si pubblica. File di lavoro: online risponde 404 |
| `biglietto.html` | Il prodotto Biglietto, più il secondo progetto |
| `privacy.html` | Informativa privacy IT (include §2.4, comunicazioni commerciali) |
| `404.html` | Errore IT, `noindex` |
| `en/index.html`, `en/biglietto.html`, `en/studio.html`, `en/privacy.html` | Versioni inglesi (`en/studio.html` presenta lo Studio in breve, senza vendita) |
| `en/404.html` | Errore EN, servito per ogni `/en/*` sconosciuto |
| `assets/site.css` | L'unico foglio di stile del sito |
| `assets/fonts/archivo.woff2` | Archivo a larghezza normale, pesi 400–500, solo caratteri latini; licenza in `OFL-archivo.txt` |
| `assets/foto/ivan-*.jpg` | Le due foto di "Chi sono", ognuna in due larghezze per lo `srcset`, senza metadati EXIF |
| `assets/logo/ivan-maggini-studio-*` | Il marchio dello Studio: la parola in nero e in bianco (`.svg`) e il simbolo "IM." con il punto ambra (`.svg`, `.png`). Sul sito si usa solo la parola nera, nell'apertura delle pagine Studio. I file non vanno ottimizzati né riscritti: il blocco `<metadata>` resta dov'è |
| `assets/og/og-*.png` | Immagini Open Graph 1200×630, una per pagina (`-en` per l'inglese) |
| `assets/favicon.svg`, `assets/apple-touch-icon.png` | Icone |
| `netlify.toml` | URL puliti, redirect delle vecchie rotte, 404 EN, header, cache |
| `sitemap.xml` | Tutte le pagine indicizzabili, con le coppie `hreflang` |
| `robots.txt` | Permette tutto e punta alla sitemap |

Ogni pagina esiste in italiano e in inglese: il servizio Studio lavora in
tutta Italia e presto anche all'estero. Le versioni inglesi dei testi legali
sono traduzioni, e dicono che in caso di differenze prevale l'italiano.

**Un'eccezione, consapevole: `avvocati.html` esiste solo in italiano.** Parla
ad avvocati italiani e alle regole della professione forense italiana, e una
traduzione non servirebbe a nessuno. Per questo porta solo le righe
`hreflang` `it` e `x-default` (nessuna `en`). Il link EN del selettore lingua
e il link "English" del piede portano a `/en/studio`, la pagina inglese più
vicina. Nessuna pagina inglese la collega, e nella sitemap la sua voce avrà
solo `it` e `x-default`. Una nuova pagina solo italiana richiede la stessa
scelta esplicita, annotata qui e nel README.

## Struttura di ogni pagina

Tutte le pagine hanno lo stesso scheletro. Per crearne una nuova si copia
quella più simile, non si parte da zero.

- **`<head>`**, in quest'ordine: `charset`, `viewport`,
  `format-detection telephone=no`, `title`, `description`, `canonical`
  (URL pulito, senza `.html`), le tre righe `hreflang` (`it`, `en`,
  `x-default` → versione IT), `theme-color #ebebe8`, il blocco Open Graph
  (`og:url`, `og:locale`, `og:image` con width/height/alt, `twitter:card`),
  il `preload` di `/assets/fonts/archivo.woff2` (identico ovunque),
  `site.css?v=…`, favicon e apple-touch-icon. Nessuna risorsa esterna:
  niente Google Fonts, niente CDN.
- **`<body>`**: link `.skip`, poi `header.top` con `.mark` e il `nav`.
  La voce della pagina corrente ha `aria-current="page"`. Nel selettore
  `.lang`, `aria-current="true"` va sulla lingua corrente e ogni link punta
  alla controparte dell'altra lingua. Poi `main`, con le sezioni `.sec` >
  `.shell.sec-grid` > `p.rail` + `.body`. Nei testi legali il contenitore è
  `.shell.sec-grid.legal`, con i paragrafi come figli diretti, e i titoli
  sono `<h2><span class="n">1</span><span class="t">Titolo</span></h2>`: così
  il numero resta appeso sull'asse sinistro. Al massimo un campo `.board`
  nero per pagina, e solo dove si agisce (il contatto). Infine
  `footer.foot` con indirizzo, P. IVA e link.
- **Movimento**: un solo momento per pagina, all'apertura, tutto in CSS. In
  home e nelle pagine Studio è l'entrata lenta (`.entra-titolo` sull'h1 e
  sull'etichetta accanto, `.entra` sul resto, comprese le tre porte della
  home, con `--n` frazionario perché stiano più vicine fra loro; durate nelle
  variabili `--ingresso-*`); nelle altre
  pagine la classe `.scopri` sull'h1. In più, sotto la prima schermata, le pagine con
  la classe `rivela` sul `main` (home, Studio e Biglietto, in IT e EN, e la
  pagina per avvocati) fanno
  comparire i blocchi mentre entrano nella finestra, con una timeline di
  scorrimento in CSS (`@supports`, solo schermo, mai con
  `prefers-reduced-motion`); le pagine legali e la 404 no. Nessun JavaScript.
  Una pagina nuova di vendita o di racconto aggiunge la classe `rivela` al suo
  `main`.
- Le pagine IT usano `id="contenuto"`, le EN `id="content"`.

Le regole del sistema visivo (griglia a 12 colonne con due assi, un solo
carattere in due pesi, sei dimensioni, niente card, ambra solo sul nero e
solo per l'azione, un solo momento animato) sono scritte in testa a
`assets/site.css` e nel README, e vanno rispettate. Si usano solo le variabili
`--s1`…`--s6` per le spaziature e i colori definiti in `:root`.

## Aggiungere una pagina nuova

Esempio: la rotta `/nome`, con la versione inglese `/en/nome`.

1. **File HTML.** Si copia la pagina più simile (`privacy.html` per un testo
   legale, `biglietto.html` per una pagina di contenuto) in `nome.html`. Poi
   si aggiornano `title`, `description`, `canonical`
   `https://ivanmaggini.com/nome`, tutto il blocco OG (`og:url`,
   `og:title`, `og:description`, `og:image`, `og:image:alt`), gli
   `aria-current` del nav e i link del selettore lingua.
2. **Immagine OG.** Si crea `assets/og/og-nome.png` a 1200×630 (e
   `og-nome-en.png` per l'inglese), sullo stesso modello delle altre: carta,
   etichetta sull'asse sinistro, titolo sull'asse del contenuto, filetto e
   dominio in basso.
3. **`netlify.toml`.** Si aggiunge la riscrittura, con `status = 200` (non
   301: l'URL resta pulito):
   ```toml
   [[redirects]]
     from = "/nome"
     to = "/nome.html"
     status = 200
   ```
   Netlify applica la prima regola che corrisponde. Le regole `/en/…` vanno
   quindi **prima** del catch-all `from = "/en/*"` → `/en/404.html`,
   altrimenti la pagina inglese risponde 404. Se una rotta viene rinominata,
   si aggiunge un 301 dalla vecchia alla nuova, come per `/startup`.
4. **`sitemap.xml`.** Si aggiunge un `<url>` con `loc` pulito, `lastmod` di
   oggi (`AAAA-MM-GG`) e `priority`: 0.9 per le pagine principali, 0.7–0.8
   per le versioni EN, 0.2 per le pagine legali. Entrambe le voci (IT ed EN)
   portano le tre righe `xhtml:link` (`it`, `en`, `x-default` → IT). Le
   pagine 404 non vanno nella sitemap.
5. **Versione inglese.** Si crea `en/nome.html` partendo da un'altra pagina
   in `en/`: `lang="en"`, skip "Skip to content" con `#content`,
   `aria-label="Sections"` / `"Footer links"`, `og:locale en_GB` più
   `og:locale:alternate it_IT`, footer con "Italy" / "VAT". Stessi
   `canonical` e `hreflang`, ma con i ruoli invertiti. Poi va aggiornata
   **anche la pagina IT**: le tre righe `hreflang` e il link EN nel
   selettore lingua. Si aggiungono anche la regola in `netlify.toml` (prima
   di `/en/*`) e la voce nella sitemap.
6. **Link in entrata.** Se la pagina deve essere raggiungibile, la si
   aggiunge al `nav` e/o al footer di tutte le pagine della stessa lingua.
   Le pagine sono indipendenti: non c'è un template condiviso, quindi la
   modifica va ripetuta a mano in ogni file.
7. **Impronta.** Si lancia lo script qui sotto. Mette l'impronta giusta
   anche nella pagina nuova, e rilanciarlo non fa danni.
8. **README.** Si aggiorna la tabella "Pagine".

## Regola dell'impronta del CSS

`site.css` si richiama sempre con l'impronta del contenuto:
`/assets/site.css?v=<primi 10 caratteri dello sha256>`. Senza, un browser
con la versione vecchia in cache servirebbe CSS vecchio a HTML nuovo, e la
pagina resterebbe senza stile.

**Dopo ogni modifica a `assets/site.css`, e dopo aver creato una pagina**,
prima del commit si rigenera l'impronta in tutte le pagine:

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

Per controllare, deve uscire una sola impronta:

```
grep -ho 'site\.css?v=[0-9a-f]*' $(git ls-files '*.html') | sort | uniq -c
```

La seconda rete è l'header `Cache-Control: max-age=0, must-revalidate` su
`/assets/*`, in `netlify.toml`. Non sostituisce l'impronta. Le immagini in
`/assets/og/` hanno invece un'ora di cache.

## Provare in locale

`python3 -m http.server 8000` basta per leggere le pagine, aprendole come
`/nome.html`. Per le rotte pulite e il 404 inglese serve `netlify dev`.

## Convenzioni

- Tutto è in italiano: testi, commenti nel codice e messaggi di commit. I
  commenti spiegano il *perché* di una scelta, non il cosa.
- Sul sito non ci sono moduli: l'unico contatto è `general@ivanmaggini.com`.
  Non si aggiungono form, analytics, cookie o risorse da server di terzi
  (caratteri, script, immagini) senza aggiornare l'informativa privacy, in
  entrambe le lingue.
- Quando cambia l'informativa privacy, si aggiorna la data nella
  `.rail` ("Ultimo aggiornamento") e il `lastmod` nella sitemap.
- Regole ferme sui testi dello Studio, in ogni pagina e lingua, compresi
  commenti nel codice e testi alternativi. Non si parla mai di clienti di
  Ivan né di lavori svolti: niente casi, niente "lavoro con...", nessun
  numero attribuito a clienti. Si presenta solo il metodo. Una professione
  sola è esclusa del tutto dal sito, e non va nominata: quella di chi
  autentica gli atti, con il suo ordine e il suo consiglio. Il controllo
  `grep -rniIE --exclude-dir=.git 'nota(i|io|ri)' .` non deve trovare
  niente (l'espressione è scritta così per non nominarla qui). Niente
  trattini lunghi, nessuna promessa di risultati, nessun prezzo, tono
  sobrio.
- Le frasi che vanno controllate sulle fonti ufficiali (numeri di articoli,
  leggi, date) cominciano con il segno visibile `[DA VERIFICARE]`, con un
  commento accanto. **Prima di pubblicare la pagina**,
  `grep -rn --include='*.html' "DA VERIFICARE" .` non deve dare risultati.
  Sui testi di legge niente virgolette, e i link alle norme li aggiunge
  Ivan dopo averle verificate.
- I link a indirizzi che non esistono ancora portano l'attributo
  `data-provvisorio`, per esempio un `#ancora` al posto del sito dei viaggi
  finché non esiste. **Prima del merge su `main`**,
  `grep -rn --include='*.html' "data-provvisorio" .` non deve dare nessun
  risultato: ogni link va sostituito con l'indirizzo vero. Il filtro sugli
  HTML serve perché senza troverebbe sempre questa riga.
  Cosa va riempito prima del merge: più niente. I link social sono tutti
  veri: Instagram italiano `ivan.maggini`, TikTok italiano `@ivan.maggini`,
  Instagram inglese `ivanmaggini.global`, TikTok inglese `@ivanmaggini.gl`.
  I profili italiani stanno solo sulle pagine IT e gli inglesi solo sulle
  pagine EN, senza mischiare le lingue, con `target="_blank"
  rel="noopener"`. YouTube per ora è tolto dal piede: si riaggiunge, con un
  link per lingua, quando esiste il canale, e con lui il `sameAs` del
  JSON-LD.
