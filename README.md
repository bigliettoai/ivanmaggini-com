# ivanmaggini.com

Sito personale di Ivan Maggini. Statico, senza build step, pensato per Netlify.

## Struttura

| File | Rotta | Contenuto |
| --- | --- | --- |
| `index.html` | `/` | Homepage: presenta le due aree e linka a ciascuna |
| `startup.html` | `/startup` | Biglietto (stato del prodotto, link) + accenno al secondo progetto |
| `studio.html` | `/studio` | Ivan Maggini Studio — sezione principale: metodo, prova gratuita, attrezzatura, pacchetti, FAQ, form |
| `privacy.html` | `/privacy` | Informativa privacy (GDPR) |
| `grazie.html` | `/grazie` | Conferma dopo l'invio del modulo |
| `en/index.html` | `/en/` | Homepage in inglese |
| `en/startup.html` | `/en/startup` | Sezione startup in inglese |
| `en/privacy.html` | `/en/privacy` | Informativa privacy in inglese |
| `404.html` | — | Pagina di errore servita automaticamente da Netlify |
| `assets/site.css` | — | Unico foglio di stile, con i tre temi di colore |
| `assets/favicon.svg` | — | Monogramma |
| `netlify.toml` | — | Publish directory, URL puliti, redirect www, header di sicurezza |

Le rotte senza `.html` sono dichiarate come rewrite (status 200) in
`netlify.toml`, quindi non dipendono dall'impostazione "Pretty URLs" di Netlify.

## Lingue

Home, startup e privacy esistono in italiano (`/…`) e in inglese (`/en/…`),
come pagine separate: nessun JavaScript, un URL indicizzabile per lingua e i
`<link rel="alternate" hreflang>` incrociati su ogni pagina.

La sezione **Studio è solo in italiano**, ed è una scelta: si rivolge a studi
professionali lombardi. Le pagine inglesi ci linkano comunque, segnalando che
il contenuto è in italiano.

Il selettore IT/EN nella barra compare solo dove entrambe le versioni esistono.
Se aggiungi una pagina bilingue, ricordati di aggiornare tre punti: il
selettore, i tag `hreflang` di entrambe le versioni e `sitemap.xml`.

## Design

Un solo foglio di stile, tre temi applicati con una classe sul `<body>`:

- `.theme-hub` — inchiostro caldo, neutro (home, privacy, 404)
- `.theme-startup` — navy e oro, eco visiva di Biglietto (`/startup`)
- `.theme-studio` — crema chiara e verde profondo (`/studio`)

Le due sezioni si distinguono a colpo d'occhio, ma restano lo stesso brand:
tipografia condivisa (Fraunces / Inter / Space Mono), stessa scala di
spaziature, stesso motivo del biglietto perforato.

Tutto è mobile-first: il layout parte da una colonna sola e i breakpoint
(`700px`, `768px`, `860px`) aggiungono le griglie.

## Form di contatto

Il modulo di `/studio` usa **Netlify Forms**: nessun backend da gestire.

- `name="studio-contatto"` — il nome con cui compare nel pannello Netlify
- `data-netlify="true"` — Netlify registra il form analizzando l'HTML al deploy
- `netlify-honeypot="bot-field"` — trappola anti-spam
- `action="/grazie"` — pagina di conferma dopo l'invio

Dopo il primo deploy, in **Netlify → Site configuration → Forms**:

1. Verifica che `studio-contatto` compaia nell'elenco.
2. In **Form notifications** aggiungi una notifica email verso
   `studio@ivanmaggini.com`, altrimenti gli invii restano solo nel pannello.

I form vanno registrati con un deploy: se modifichi i campi, l'aggiornamento è
visibile solo dopo il deploy successivo.

## Deploy su Netlify

1. **Add new site → Import an existing project** e collega questo repository.
2. Build command: vuoto. Publish directory: la root del repository (`.`).
   Se il sito vive in una sottocartella del repo, imposta quella cartella come
   *base directory*.
3. **Domain management → Add a custom domain** → `ivanmaggini.com`.
4. Punta i DNS del dominio a Netlify (nameserver Netlify, oppure record A/ALIAS
   verso il load balancer indicato nel pannello) e attiva il certificato HTTPS
   gratuito Let's Encrypt.
5. Il redirect `www → apex` è già in `netlify.toml`.

## Sviluppo in locale

Non serve nessuna toolchain:

```sh
python3 -m http.server 8000
```

Nota: con un server statico semplice le rotte pulite (`/studio`) non vengono
riscritte — apri `studio.html`. Con `netlify dev` (Netlify CLI) le rewrite di
`netlify.toml` funzionano come in produzione.

## Da completare

- **Link Instagram**: in `startup.html` il pulsante social è commentato, in
  attesa dell'URL esatto del profilo (non l'ho inventato per non pubblicare un
  link sbagliato). Togli il commento e inserisci l'handle.
- **Immagini Open Graph**: le pagine dichiarano `og:title` e `og:description`
  ma non `og:image`. Quando ci sarà una foto o una copertina, aggiungila in
  `assets/` e referenziala nei `<meta>`.
- **Dati fiscali**: se e quando l'attività avrà partita IVA, vanno aggiunti nel
  footer e nella sezione 1 della privacy policy.
