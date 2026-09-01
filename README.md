# ivanmaggini.com

Sito personale di Ivan Maggini. Due cose in un posto solo: chi è e cosa sta
costruendo (Biglietto), e il servizio video per studi professionali in
Lombardia (Ivan Maggini Studio).

Sono file statici: HTML, un foglio di stile, ottanta righe di JavaScript.
Nessun build step, nessuna dipendenza, nessun framework. Si apre `index.html`
e c'è tutto.

## Pagine

| Rotta          | File               | Cosa c'è                                        |
| -------------- | ------------------ | ----------------------------------------------- |
| `/`            | `index.html`       | Chi sono, il tabellone, Biglietto, Studio        |
| `/studio`      | `studio.html`      | La pagina di vendita del servizio video          |
| `/privacy`     | `privacy.html`     | Informativa privacy                              |
| `/condizioni`  | `condizioni.html`  | Condizioni generali di servizio                  |
| `/en/`         | `en/index.html`    | Versione inglese: profilo e Biglietto            |
| `/en/privacy`  | `en/privacy.html`  | Informativa privacy in inglese                   |

La sezione Studio esiste solo in italiano: si rivolge a studi professionali
lombardi. Biglietto non ha una pagina propria, è una sezione della home, e i
vecchi indirizzi `/startup` e `/en/startup` ci reindirizzano.

## Il sistema visivo

L'idea di fondo è un tabellone di partenze. Le cose che Ivan fa hanno uno
stato e lui lo dichiara: il prodotto è offline e torna in autunno, lo studio
prende clienti adesso.

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

Due cose sole si muovono da sole, ed è tutto in `assets/site.js` (ottanta
righe, nessuna libreria):

1. Le righe della testata salgono da una maschera, una dopo l'altra.
2. Gli stati sul tabellone si assestano come le palette di un tabellone di
   partenze: passano per qualche carattere sbagliato e poi si fermano.
   Succede una volta sola, quando il blocco entra in vista.

Con `prefers-reduced-motion: reduce` non succede niente di tutto questo e il
testo compare fermo. Il testo definitivo resta sempre nel documento in una
copia riservata ai lettori vocali, quindi la scomposizione non arriva mai a
chi legge con la voce.

## Nessun modulo

Sul sito non c'è nessun form. L'unica azione possibile è scrivere a
`general@ivanmaggini.com`. È una scelta: senza raccolta non ci sono dati da
custodire, e l'informativa privacy si accorcia di conseguenza.

## Pubblicazione

Deploy su Netlify dal branch `main`, senza build. `netlify.toml` tiene gli
URL puliti, i reindirizzamenti delle vecchie rotte, il 404 separato per le
pagine inglesi e le intestazioni di sicurezza.

## Lavorarci

```
python3 -m http.server 8000
```

Basta per leggere il contenuto. Per provare le rotte pulite (`/studio` invece
di `/studio.html`) serve un server che applichi le riscritture di
`netlify.toml`, oppure `netlify dev`.
