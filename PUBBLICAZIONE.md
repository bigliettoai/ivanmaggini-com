# Pubblicazione della pagina avvocati

La pagina `avvocati.html` (rotta `/avvocati`) è in preparazione. Finché lo
resta, non deve trovarla nessuno: ha il `noindex`, non è nella sitemap e
nessuna pagina la collega. Si guarda solo conoscendo l'indirizzo, cioè
`/avvocati.html` nell'anteprima di Netlify.

Questo file dice cosa cambiare il giorno in cui si pubblica, in quest'ordine.
È un file di lavoro: online risponde 404, come il README (regola in testa a
`netlify.toml`).

La pagina esiste solo in italiano, per scelta: è un'eccezione consapevole alla
regola delle due lingue, annotata in `CLAUDE.md` e nel README. Per questo
porta solo le righe `hreflang` `it` e `x-default`, e il selettore lingua e il
link "English" del piede portano a `/en/studio`.

## Prima di tutto: i testi di legge

1. Verificare sulle fonti ufficiali la frase con i numeri degli articoli,
   quella che comincia con `[DA VERIFICARE]` nella sezione sulle regole.
   Togliere il segno `[DA VERIFICARE]` e il commento che lo accompagna, e
   aggiungere i link alle norme, se servono.
2. Controllare che non resti nessun segno:

   ```
   grep -rn --include='*.html' "DA VERIFICARE" .
   ```

   deve dare zero risultati.

## In `avvocati.html`

3. **Togliere il `noindex`**: la riga
   `<meta name="robots" content="noindex">` nel `<head>`, con il commento
   che la precede.
4. **Immagine Open Graph.** Creare `assets/og/og-avvocati.png` a 1200×630
   sullo stesso modello delle altre (carta, etichetta sull'asse sinistro,
   titolo sull'asse del contenuto, filetto e dominio in basso). Poi, nel
   `<head>`, `og:image` da `og-studio.png` a `og-avvocati.png`, e
   `og:image:alt` con il titolo della nuova immagine. Togliere il commento
   che segnala l'immagine provvisoria.

## In `netlify.toml`

5. **Aggiungere la riscrittura** dell'URL pulito, vicino a quella di
   `/studio` (non è una regola `/en/`, quindi la posizione rispetto al
   catch-all `/en/*` non conta):

   ```toml
   # La pagina per avvocati e studi legali, solo in italiano.
   [[redirects]]
     from = "/avvocati"
     to = "/avvocati.html"
     status = 200
   ```

   Finché la regola non c'è, l'indirizzo che funziona sempre è
   `/avvocati.html`.

## In `sitemap.xml`

6. **Aggiungere la voce**, con il `lastmod` del giorno di pubblicazione
   (`AAAA-MM-GG`). Solo le righe `it` e `x-default`, perché la versione
   inglese non c'è:

   ```xml
   <url>
     <loc>https://ivanmaggini.com/avvocati</loc>
     <xhtml:link rel="alternate" hreflang="it" href="https://ivanmaggini.com/avvocati"/>
     <xhtml:link rel="alternate" hreflang="x-default" href="https://ivanmaggini.com/avvocati"/>
     <lastmod>AAAA-MM-GG</lastmod>
     <priority>0.9</priority>
   </url>
   ```

## Link in menu e piede

7. **Menu e piede di tutte le pagine italiane**: `index.html`,
   `studio.html`, `biglietto.html`, `privacy.html`, `404.html` e la pagina
   stessa. Non c'è un template condiviso: la modifica va ripetuta a mano in
   ogni file. Le pagine inglesi non la collegano, perché la pagina è solo in
   italiano (come i profili social, le lingue non si mischiano).
   - Nel `nav` della barra in alto, dopo Studio:
     `<a href="/avvocati">Avvocati</a>`. In `avvocati.html` la voce porta
     `aria-current="page"`.
   - Nel `nav` del piede, dopo Studio: `<a href="/avvocati">Avvocati</a>`.
   - Da valutare: un link anche dal corpo di `/studio`, nella colonna per
     avvocati e studi legali della sezione "Per chi".
8. Se il menu diventa troppo lungo su un telefono stretto (sotto i 360 px),
   provarlo prima di pubblicare: la barra ha marchio, voci e lingue sulla
   stessa riga.

## Documentazione

9. Nel README, tabella "Pagine", togliere "in preparazione" dalla riga di
   `/avvocati`. In `CLAUDE.md`, stessa cosa nella tabella dei file.
10. Cancellare questo file e la sua regola 404 in `netlify.toml`, oppure
    lasciarlo come promemoria per la prossima pagina.

## Controlli finali, prima del merge su `main`

```
grep -rn --include='*.html' "DA VERIFICARE" .
grep -rn --include='*.html' "data-provvisorio" .
grep -rn --include='*.html' 'name="robots"' .
grep -ho 'site\.css?v=[0-9a-f]*' $(git ls-files '*.html') | sort | uniq -c
```

I primi due non devono dare risultati. Il terzo deve trovare solo le due
pagine 404. L'ultimo deve dare una sola impronta.
