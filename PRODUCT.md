# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Il sito ha due pubblici. **Quando le loro esigenze si scontrano, vengono
prima i clienti di Studio**: è il servizio che oggi deve portare lavoro.

- **Clienti di Ivan Maggini Studio** (pubblico primario). Titolari di studi
  professionali e di aziende in tutta Italia, e presto all'estero. Tre
  gruppi, come li nomina `studio.html`:
  - professioni che si scelgono per fiducia: dentisti, avvocati, notai,
    commercialisti, studi medici;
  - studi che vivono di progetti: architetti, ingegneri, studi di design,
    imprese di costruzione;
  - aziende che vendono un prodotto: manifattura, alimentare di qualità,
    artigianato, e-commerce.

  Hanno poco tempo, tengono alla propria reputazione e diffidano dei
  contenuti "acchiappaclick". Il loro compito sul sito è capire se il
  servizio fa per loro e, se sì, scrivere per prenotare la consulenza
  gratuita di venti minuti.
- **Chi arriva per Biglietto.** È un pubblico misto, e tutti i gruppi
  contano: futuri utenti (viaggiatori da mandare su biglietto.ai), investitori
  e partner che valutano il founder e il progetto, chi segue il racconto su
  Instagram e altri founder che costruiscono nello stesso spazio e possono
  dare un consiglio.

## Product Purpose

È il sito personale di Ivan Maggini, che ha 19 anni e fa due mestieri:

1. **Ivan Maggini Studio**: video per studi professionali e aziende. Ivan va
   sul posto con l'attrezzatura e gli script già scritti. In mezza giornata
   ogni due mesi si registra il materiale di due o tre mesi, poi lui monta e
   pubblica. Lo script, le riprese, il montaggio e la pubblicazione li cura
   una persona sola.
2. **Biglietto** (biglietto.ai), un prodotto in costruzione per chi viaggia:
   un posto solo per tutto il viaggio e, sopra, a pagamento, cosa comprare
   davvero, in che ordine e dove. In prospettiva è un assistente che agisce
   prima che il viaggiatore chieda. C'è anche un secondo progetto, che per
   ora resta riservato.

Il successo, in ordine: per Studio, richieste di consulenza via email; per
Biglietto, visite a biglietto.ai e contatti da investitori, partner e
founder.

## Positioning

- **Studio vende il tempo che il cliente non spende, non i contenuti.** La
  promessa è "Mezza giornata ogni due mesi. Al resto penso io". L'obiettivo
  dichiarato non è la popolarità: chi ha bisogno di quel professionista
  deve averlo già visto e ascoltato prima della telefonata. Una persona
  sola segue tutto, dallo script alla pubblicazione. Se il cliente lavora
  con l'estero, nella stessa sessione si girano anche i contenuti in
  inglese, con temi propri e non tradotti.
- **Il founder racconta in pubblico, anche quando le cose vanno male.**
  Ivan non ha una formazione tecnica e lo dice. La sua competenza viene da
  anni di racconto di viaggi su Instagram, dove è arrivato a 30.000 persone
  senza pubblicità, e da lì nasce Biglietto.

## Operating Context

- Il cliente di Studio arriva da ricerca, passaparola o Instagram, legge la
  pagina, scrive a `general@ivanmaggini.com` (bastano il nome, la città e
  due righe su cosa fa) e riceve risposta entro 24 ore. Segue una call
  gratuita di venti minuti, poi una proposta su misura.
- Le riprese avvengono nella sede del cliente, in tutta Italia, e il
  servizio è regolato da `condizioni.html` / `en/terms.html`.
- Tutto esiste in italiano e in inglese. Nei testi legali, in caso di
  differenze, prevale l'italiano.

## Capabilities and Constraints

- Sito statico: HTML scritto a mano, un foglio di stile e un carattere
  ospitato sul sito. Non ci sono build, dipendenze, framework né JavaScript.
  Il deploy va su Netlify da `main`. Le regole operative stanno in
  `CLAUDE.md`.
- **Nessun modulo, di proposito.** L'unica azione è scrivere a
  `general@ivanmaggini.com`. Niente analytics, cookie o risorse di terzi,
  a meno di aggiornare l'informativa privacy in entrambe le lingue.
- Su Studio c'è una sola chiamata all'azione, sempre con le stesse parole:
  "Prenota la consulenza gratuita".
- Ogni pagina ha la sua controparte EN (`/condizioni` ↔ `/en/terms`).
- Il sito non pubblica prezzi.
- Studio fa solo contenuti che costruiscono fiducia: spiegazioni, casi
  ricorrenti, risposte alle domande frequenti. Niente trend comici né video
  acchiappaclick.

## Brand Commitments

- I nomi sono "Ivan Maggini", "Ivan Maggini Studio" e "Biglietto"
  (biglietto.ai). Sede a Lurano (BG), P. IVA 04924920160.
- La voce è in prima persona, diretta e onesta, senza gergo da agenzia.
  Ammette i limiti ("non fingo il contrario") e ai clienti Studio dà del
  voi.
- L'apertura della home parte da cosa fa Ivan, non da come si chiama.

## Evidence on Hand

- L'account Instagram `instagram.com/ivan.maggini` ha 30.000 persone,
  raggiunte senza pubblicità.
- Biglietto ha un prodotto in costruzione su biglietto.ai.
- **Per Studio non ci sono ancora lavori, clienti nominabili né
  testimonianze.** Le pagine non devono inventare né suggerire prove, loghi,
  numeri o casi studio finché non esistono davvero.

## Product Principles

1. **Lo Studio prima.** Se una scelta aiuta Biglietto a spese della chiarezza
   del servizio Studio, vince Studio.
2. **Un'azione, un canale.** Si contatta solo per email, senza moduli né
   passaggi intermedi, e la risposta arriva entro 24 ore.
3. **Niente prove finte.** Si dice solo ciò che è vero oggi, compresi i
   limiti, e si aspetta di avere le prove prima di mostrarle.
4. **Il tempo del cliente è il prodotto.** Ogni pagina di Studio deve far
   capire quanto poco viene chiesto al cliente.
5. **Bilingue per davvero.** L'inglese non è una cortesia: Studio si sta
   espandendo all'estero, e ogni pagina ha la sua controparte.

## Accessibility & Inclusion

Il testo secondario mantiene almeno 4,5:1 sulla carta. Con
`prefers-reduced-motion` non si muove nulla, e ogni pagina è completa anche
senza movimento. Ci sono il link per saltare al contenuto e l'indicazione
della pagina corrente nella navigazione. Nessuno standard formale è stato
fissato oltre a questo.
