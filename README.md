# ivanmaggini.com

Sito personale di Ivan Maggini. Due cose in un posto solo: chi è e cosa sta
costruendo (Biglietto), e il servizio video per studi professionali in
Lombardia (Ivan Maggini Studio).

Sono file statici: HTML, un foglio di stile, ottanta righe di JavaScript.
Nessun build step, nessuna dipendenza, nessun framework. Si apre `index.html`
e c'è tutto.

## Pagine

| Rotta            | File                 | Cosa c'è                                |
| ---------------- | -------------------- | --------------------------------------- |
| `/`              | `index.html`         | Chi sono, e le due porte del sito       |
| `/biglietto`     | `biglietto.html`     | Il prodotto, e il secondo progetto      |
| `/studio`        | `studio.html`        | La pagina di vendita del servizio video |
| `/privacy`       | `privacy.html`       | Informativa privacy                     |
| `/condizioni`    | `condizioni.html`    | Condizioni generali di servizio         |
| `/en/`           | `en/index.html`      | Versione inglese: chi sono              |
| `/en/biglietto`  | `en/biglietto.html`  | Il prodotto, in inglese                 |
| `/en/privacy`    | `en/privacy.html`    | Informativa privacy in inglese          |

Biglietto ha una pagina propria in entrambe le lingue. La sezione Studio
esiste solo in italiano: si rivolge a studi professionali lombardi. I vecchi
indirizzi `/startup` e `/en/startup` reindirizzano alle pagine Biglietto.

## Il sistema visivo

L'idea di fondo viene dal nome del prodotto: un biglietto è un oggetto di
carta sottile, con un bordo strappato e i dati incolonnati. Da lì la carta
grigia fredda per il testo e un unico blocco nero per pagina, con il bordo
superiore perforato.

- **Carta**, `#ebebe8`: un grigio chiaro neutro, non una crema calda.
- **Nero vero**, `#000000`, per il testo. Il tabellone è `#0c0c0c`.
- **Ambra**, `#ffab00`, solo dentro il blocco nero. Su carta non passerebbe
  mai il contrasto, e il vincolo tiene il colore al suo posto.
- **Archivo** variabile, usato in larghezza espansa (`font-stretch` fino a
  118%) per titoli e dati: è il modo in cui è scritta la segnaletica.
- **Newsreader** per il testo corrente. Un serif, cioè l'opposto della
  combinazione display-serif più corpo-sans che si vede ovunque.
- Le etichette di sezione stanno nel margine sinistro, in tondo minuscolo.
  Non ci sono maiuscolette spaziate sopra ai titoli.
- Le card esistono solo dove il contenuto è davvero parallelo: i due pubblici
  del servizio e i tre listini. Tutto il resto è testo impaginato.

Il bordo superiore del blocco nero è perforato come il margine di un
biglietto staccato. È l'unico ornamento del sito.

## Il movimento

Due cose sole si muovono da sole:

1. Le righe della testata salgono da una maschera, una dopo l'altra. Sta
   tutto nel CSS, `.reveal`.
2. L'indirizzo email nel blocco nero entra una lettera per volta, quando il
   blocco arriva in vista. Sono sessanta righe in `assets/site.js`, nessuna
   libreria. Le lettere sono sempre quelle giuste: un indirizzo che passa per
   caratteri a caso sembra un errore, non un tabellone.

Con `prefers-reduced-motion: reduce` non succede niente di tutto questo e il
testo compare fermo. Lo script non parte nemmeno se il foglio di stile non
risulta applicato, e una rete di sicurezza mostra comunque l'indirizzo dopo
tre secondi se l'osservatore non scattasse: è l'unico modo per contattare, e
non può restare invisibile.

Il testo resta leggibile per i lettori vocali attraverso `aria-label`, mentre
le lettere spezzettate sono marcate `aria-hidden`.

## Nessun modulo

Sul sito non c'è nessun form. L'unica azione possibile è scrivere a
`general@ivanmaggini.com`. È una scelta: senza raccolta non ci sono dati da
custodire, e l'informativa privacy si accorcia di conseguenza.

## Pubblicazione

Deploy su Netlify dal branch `main`, senza build. `netlify.toml` tiene gli
URL puliti, i reindirizzamenti delle vecchie rotte, il 404 separato per le
pagine inglesi e le intestazioni di sicurezza.

**Il foglio di stile e lo script si richiamano con l'impronta del loro
contenuto nell'indirizzo** (`/assets/site.css?v=...`). Non è un vezzo: senza,
un browser che ha in cache la versione precedente continua a servirla, e se
nel frattempo sono cambiati i nomi delle classi la pagina esce senza stile.
Dopo ogni modifica a `assets/site.css` o `assets/site.js` va rigenerata
l'impronta in tutte le pagine:

```
python3 - <<'EOF'
import hashlib, re
from pathlib import Path
h = lambda f: hashlib.sha256(Path(f).read_bytes()).hexdigest()[:10]
css, js = h('assets/site.css'), h('assets/site.js')
for f in Path('.').glob('**/*.html'):
    t = f.read_text(encoding='utf-8')
    t = re.sub(r'href="/assets/site\.css(\?v=[0-9a-f]+)?"', f'href="/assets/site.css?v={css}"', t)
    t = re.sub(r'src="/assets/site\.js(\?v=[0-9a-f]+)?"', f'src="/assets/site.js?v={js}"', t)
    f.write_text(t, encoding='utf-8')
print(css, js)
EOF
```

Gli asset sono comunque dichiarati `max-age=0, must-revalidate`: è la seconda
rete, per il giorno in cui l'impronta non venisse rigenerata.

## Lavorarci

```
python3 -m http.server 8000
```

Basta per leggere il contenuto. Per provare le rotte pulite (`/studio` invece
di `/studio.html`) serve un server che applichi le riscritture di
`netlify.toml`, oppure `netlify dev`.
