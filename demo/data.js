/* ------------------------------------------------------------------
   Biglietto, demo dimostrativa. I dati.

   Tutto quello che si vede a schermo nasce da qui: quattro prenotazioni
   finte, scritte a mano, sempre le stesse. Non c'è nessuna chiamata di
   rete, nessun servizio esterno, nessun orario calcolato al momento.
   Rilanciata domani, la demo dice esattamente le stesse cose di oggi.

   Lo scenario: Milano - Vienna a metà ottobre, quattro prenotazioni
   comprate da quattro venditori diversi. Le date sono quelle che
   escono dalla richiesta della fase 1, "four days, mid October": il
   viaggio di andata occupa il giovedì e il venerdì mattina, e il fine
   settimana a Vienna non compare qui perché non ha niente da
   decidere. I riferimenti di prenotazione
   hanno formati diversi apposta: è il segno che arrivano da sistemi
   che non si parlano.

   Sui nomi: le città in inglese (Milan, Zurich, Munich, Vienna), le
   stazioni con il nome che hanno sul biglietto (Zürich HB, München
   Hbf, Wien Hbf), gli aeroporti con il nome inglese. È la regola che
   usano i prodotti veri, ed è l'unica che non produce ibridi.
   ------------------------------------------------------------------ */

/* ------------------------------------------------------------------
   Fase 1, passo A: la richiesta.

   Una frase scritta a mano, come l'avrebbe digitata l'utente. Non c'è
   nessun campo di testo: è testo fisso, e resta identico a ogni
   riesecuzione. Il cursore che si vede in fondo è disegnato fermo,
   non lampeggia: in questa demo non si muove niente da solo.
   ------------------------------------------------------------------ */

var ASK = 'Milan to Vienna, four days, mid October. I’d rather stay on the ground where it makes sense, and I don’t want to waste a day in transit.';


/* ------------------------------------------------------------------
   Fase 1, passo B: il percorso proposto.

   Le stesse tratte che diventeranno le prenotazioni, ma prima di
   comprarle: qui non c'è ancora nessun venditore e nessun
   riferimento, e al loro posto, a filo destro, c'è la durata.

   Sotto ogni tratta c'è il motivo per cui il mezzo è quello. È il
   punto della schermata: la scelta è ragionata tratta per tratta, e
   su tre spostamenti l'aereo ne vince uno solo. Che poi sia proprio
   quello a saltare, due passi più avanti, non è un caso: è il pezzo
   che l'utente non controlla.

   Niente righe di cambio giornata qui: le due giornate le dice il
   blocco nero, e lo spazio serve ai motivi.
   ------------------------------------------------------------------ */

var PLAN = {

  board: {
    state: 'Vienna on Friday',
    subject: 'Milan 07:20 Thursday, Vienna 13:32 Friday',
    noticed: 'You said stay on the ground where it makes sense. On this route that is two legs out of three.',

    breaks: {
      label: 'Why this shape',
      items: [
        'A night in Munich instead of a thirteen-hour day',
        'Vienna at 13:32, with the afternoon still yours'
      ]
    },

    offer: {
      label: 'The way back',
      text: 'Sunday evening, direct to Milan. Nothing to choose there.'
    }
  },

  items: [
    {
      type: 'leg',
      kind: 'train',
      mode: 'Train',
      service: 'EC 314',
      duration: '3h 30m',
      from: { time: '07:20', place: 'Milano Centrale' },
      to: { time: '10:50', place: 'Zürich HB' },
      reason: 'Centre to centre in three and a half hours. The flight is 55 minutes and four hours of airport.'
    },

    {
      type: 'gap',
      text: '3h 15m in Zurich. Long enough for lunch, and long enough that a late train costs you nothing.'
    },

    {
      type: 'leg',
      kind: 'flight',
      mode: 'Flight',
      service: 'LX 1064',
      duration: '1h 05m',
      from: { time: '14:05', place: 'Zurich Airport' },
      to: { time: '15:10', place: 'Munich Airport' },
      reason: 'The one leg where the plane wins: the same afternoon by train is 4h 30m and a change.'
    },

    { type: 'gap', text: 'S-Bahn into the city, 45 minutes' },

    {
      type: 'leg',
      kind: 'stay',
      mode: 'Stay',
      service: 'One night',
      duration: '',
      from: { time: '16:30', place: 'Hotel Isarblick, Munich' },
      to: { time: '08:15', place: 'Check-out, Friday morning' },
      reason: 'Breaking the day here is what buys you Friday afternoon in Vienna.'
    },

    {
      type: 'leg',
      kind: 'train',
      mode: 'Train',
      service: 'RJX 63',
      duration: '4h 06m',
      from: { time: '09:26', place: 'München Hbf' },
      to: { time: '13:32', place: 'Wien Hbf' },
      reason: 'Four hours direct, and it puts you in the middle of Vienna rather than at its airport.'
    }
  ]
};


/* ------------------------------------------------------------------
   Fase 1, passo C: cosa comprare, e in che ordine.

   È il momento centrale di tutta la demo. Non dice che esiste un
   percorso: dice che lo stesso identico posto sullo stesso identico
   treno si compra a due prezzi diversi, e che la differenza sta nel
   modo e nell'ordine in cui lo compri.

   La meccanica è quella vera dei valichi: il biglietto internazionale
   Milano-Zurigo ha un prezzo unico a contingenti, e quando i
   contingenti bassi sono finiti resta caro. Spezzato al confine,
   ogni metà torna a essere un biglietto nazionale: la parte italiana
   è una tariffa regionale fissa, che non si muove mai, e la parte
   svizzera è un risparmio a posti limitati.

   Da lì l'ordine, che è il vero contenuto della schermata: prima la
   metà svizzera, perché è quella che si esaurisce; la metà italiana
   può aspettare, perché costa uguale adesso e fra un'ora.

   EC 314 ferma a Chiasso, che è il confine: non si scende dal treno.
   I numeri sono plausibili, non gonfiati: 89,00 contro 41,40.
   ------------------------------------------------------------------ */

var FARE = {

  board: {
    state: '€47.60 less',
    subject: 'Milan to Zurich, EC 314, the same seat',
    noticed: 'One international ticket is one fare bucket, and the cheap ones are gone. Split it at the border and each half is priced at home.',

    breaks: {
      label: 'And in this order',
      items: [
        'The Swiss half first: its saver seats are the ones that run out',
        'The Italian half second: a regional fare that never moves'
      ]
    },

    offer: {
      label: 'Why nobody tells you',
      text: 'The company selling the through ticket is the one losing the €47.60.'
    }
  },

  options: [
    {
      tone: 'dead',
      label: 'On the carrier’s site',
      figure: '€89.00',
      caption: 'Milan to Zurich, one ticket',
      legs: [
        {
          from: { time: '07:20', place: 'Milano Centrale' },
          to: { time: '10:50', place: 'Zürich HB' },
          meta: 'EC 314, international fare'
        }
      ],
      costs: [
        'One price for the whole crossing',
        'Cheap at three months out, not at three weeks'
      ]
    },
    {
      tone: 'live',
      label: 'Bought as two',
      figure: '€41.40',
      caption: 'the same seat, on the same train',
      legs: [
        {
          from: { time: '07:20', place: 'Milano Centrale' },
          to: { time: '08:16', place: 'Chiasso' },
          meta: 'Regional fare, €12.40',
          order: 'Buy second'
        },
        { change: 'You do not get off. Chiasso is the border, not a change.' },
        {
          from: { time: '08:16', place: 'Chiasso' },
          to: { time: '10:50', place: 'Zürich HB' },
          meta: 'SBB Supersaver, €29.00',
          order: 'Buy first',
          first: true
        }
      ]
    }
  ]
};


var TRIP = {

  route: { from: 'Milan', to: 'Vienna' },
  dates: 'Thursday 15 to Friday 16 October',
  lede: 'Everything you booked, in the order you will travel it.',

  /* Il conto che rende evidente il punto: un viaggio solo, quattro
     ricevute diverse. */
  facts: [
    ['Bookings', '4'],
    ['Sellers', '4'],
    ['Countries', '4']
  ],

  /* La sequenza. Tre tipi di riga: 'day' segna il cambio di giornata,
     'leg' è una prenotazione, 'gap' è il tempo fra due prenotazioni.
     I tempi di attesa sono scritti a mano, non calcolati. */
  items: [

    { type: 'day', label: 'Thursday 15 October' },

    {
      type: 'leg',
      id: 'ec314',
      kind: 'train',
      mode: 'Train',
      service: 'EC 314',
      seller: 'Trenitalia',
      ref: 'PNR 8Q4KR2',
      from: { time: '07:20', place: 'Milano Centrale' },
      to: { time: '10:50', place: 'Zürich HB' }
    },

    { type: 'gap', id: 'gapZurich', text: '3h 15m in Zurich, then 12 minutes out to the airport' },

    {
      type: 'leg',
      id: 'lx1064',
      kind: 'flight',
      mode: 'Flight',
      service: 'LX 1064',
      seller: 'Swiss',
      ref: 'booking XQ7T2M',
      from: { time: '14:05', place: 'Zurich Airport' },
      to: { time: '15:10', place: 'Munich Airport' }
    },

    { type: 'gap', id: 'gapMunich', text: 'S-Bahn into the city, 45 minutes' },

    {
      type: 'leg',
      id: 'stay',
      kind: 'stay',
      mode: 'Stay',
      service: 'One night',
      seller: 'Booking.com',
      ref: 'confirmation 4182 993 011',
      from: { time: '16:30', place: 'Hotel Isarblick, Munich' },
      to: { time: '08:15', place: 'Check-out, Friday morning' }
    },

    { type: 'day', label: 'Friday 16 October' },

    { type: 'gap', text: 'Breakfast, then 15 minutes to München Hbf' },

    {
      type: 'leg',
      id: 'rjx63',
      kind: 'train',
      mode: 'Train',
      service: 'RJX 63',
      seller: 'ÖBB',
      ref: 'order 2611-7742',
      from: { time: '09:26', place: 'München Hbf' },
      to: { time: '13:32', place: 'Wien Hbf' }
    }

  ]
};


/* ------------------------------------------------------------------
   Tappa 2: quello che si rompe.

   Il volo delle 14:05 viene cancellato mentre l'utente è ancora sul
   treno per Zurigo. Non è una notifica arrivata all'utente: è il
   sistema che se ne accorge da solo, alle 09:14, e che sa già cosa
   viene giù insieme al volo, perché ha davanti tutto il viaggio e non
   solo la prenotazione della compagnia aerea.

   L'orario del riscontro, 09:14, cade fra la partenza da Milano
   (07:20) e l'arrivo a Zurigo (10:50): l'utente è a metà del primo
   treno e non ha chiesto niente.
   ------------------------------------------------------------------ */

var DISRUPTION = {

  /* Tutte e tre le schermate del blocco nero hanno la stessa forma:
     lo stato in ambra, di cosa si parla, una riga di prosa, e due
     blocchi con l'etichetta a sinistra. Cambiano le parole. */
  board: {
    state: 'Cancelled',
    subject: 'Swiss LX 1064, 14:05 Zurich to Munich',

    /* La riga che dice la cosa più importante: nessuno ha chiesto. */
    noticed: 'Noticed at 09:14, while you were still on the train to Zurich. Nobody asked it to look.',

    breaks: {
      label: 'What it takes down with it',
      items: [
        'Tonight’s room in Munich, booked and paid for',
        'Tomorrow’s 09:26 train to Vienna, out of a city you would not be in'
      ]
    },

    offer: {
      label: 'What Swiss offers',
      text: 'A seat on LX 1074, tomorrow at 11:20, landing in Munich at 12:25. Twenty-one hours later, a night to pay for in Zurich, and the train to Vienna already gone.'
    }
  },

  /* Come si segna la sequenza. La prenotazione cancellata è la causa,
     le altre due sono l'effetto: da qui in giù la linea del viaggio
     non tiene più. */
  marks: {
    lx1064: { state: 'cancelled', tag: 'Cancelled', kind: 'cause' },
    stay: { state: 'broken', tag: 'Out of reach', kind: 'effect' },
    rjx63: { state: 'broken', tag: 'At risk', kind: 'effect' }
  },

  brokenFrom: 'lx1064'
};


/* ------------------------------------------------------------------
   Tappa 3, primo passo: le due risposte, una accanto all'altra.

   A sinistra quella della compagnia aerea, che conosce solo il proprio
   volo. A destra quella di chi ha davanti tutto il viaggio: tre treni
   e due cambi, che partono da Zurigo mezz'ora dopo l'orario del volo e
   arrivano a Monaco la sera stessa.

   La cifra sopra ogni colonna è la stessa misura per tutti e due:
   quanto si arriva tardi a Monaco rispetto alle 15:10 previste. Il
   volo di riprotezione atterra alle 12:25 del giorno dopo, cioè
   ventuno ore e un quarto più tardi; i treni alle 19:04 di stasera,
   cioè tre ore e cinquantaquattro. È l'unico confronto che serve.

   Gli orari dei treni stanno insieme: 14:33 Zurigo, 15:37 San Gallo,
   quattordici minuti di cambio, 15:51, 16:47 Lindau, diciassette
   minuti, 17:04, 19:04 Monaco. Quattro ore e mezza in tutto.
   ------------------------------------------------------------------ */

var ALTERNATIVE = {

  board: {
    state: 'Munich tonight',
    subject: 'Zürich HB 14:33, München Hbf 19:04',
    noticed: 'You leave Zurich half an hour after the flight would have. You lose the evening, not the day.',

    breaks: {
      label: 'What it saves',
      items: [
        'Tonight’s room, held instead of lost',
        'Tomorrow’s 09:26 to Vienna, still yours'
      ]
    },

    offer: {
      label: 'Against the airline’s answer',
      text: 'Twenty-one hours earlier into Munich, and no night to pay for in Zurich.'
    }
  },

  options: [
    {
      tone: 'dead',
      label: 'What Swiss offers',
      figure: '+21 h 15 m',
      caption: 'late into Munich',
      legs: [
        {
          from: { time: '11:20', place: 'Zurich Airport' },
          to: { time: '12:25', place: 'Munich Airport' },
          meta: 'LX 1074, tomorrow'
        }
      ],
      costs: [
        'A night in Zurich to pay for',
        'The 09:26 to Vienna, missed'
      ]
    },
    {
      tone: 'live',
      label: 'On the ground, tonight',
      figure: '+3 h 54 m',
      caption: 'late into Munich',
      legs: [
        {
          from: { time: '14:33', place: 'Zürich HB' },
          to: { time: '15:37', place: 'St. Gallen' },
          meta: 'IC 5, Swiss Federal Railways'
        },
        { change: '14 minutes to change' },
        {
          from: { time: '15:51', place: 'St. Gallen' },
          to: { time: '16:47', place: 'Lindau-Reutin' },
          meta: 'S-Bahn, ÖBB'
        },
        { change: '17 minutes to change' },
        {
          from: { time: '17:04', place: 'Lindau-Reutin' },
          to: { time: '19:04', place: 'München Hbf' },
          meta: 'ECE 195, Deutsche Bahn'
        }
      ]
    }
  ]
};


/* ------------------------------------------------------------------
   Tappa 3, secondo passo: il viaggio ricomposto.

   Non è una schermata nuova: è la stessa sequenza della tappa 1 con
   tre sostituzioni e una correzione, scritte qui sotto. Il volo
   cancellato diventa un tratto solo, "tre treni, due cambi", venduto
   da tre compagnie diverse; le due attese intorno cambiano testo
   perché adesso si parte e si arriva da una stazione, non da un
   aeroporto; e il check-in dell'albergo si sposta alle 19:35, con la
   camera tenuta per arrivo tardi.

   Le tre righe che nella tappa 2 dicevano Cancelled, Out of reach e
   At risk sono esattamente le stesse che qui dicono New, Moved e
   Confirmed. Stesse posizioni, stesse forme di targhetta: è la stessa
   catena, letta al contrario.
   ------------------------------------------------------------------ */

var RESOLUTION = {

  board: {
    state: 'Rebooked',
    subject: 'Zürich HB 14:33, München Hbf 19:04',
    noticed: 'Bought while you were still on the first train. The hotel knows you are coming late, and the room is held.',

    breaks: {
      label: 'What changed',
      items: [
        'The flight became three trains',
        'Check-in moved to 19:35, the room held',
        'Tomorrow’s 09:26 to Vienna, untouched'
      ]
    },

    offer: {
      label: 'What it cost you',
      text: 'Four hours into Munich. Not a day, not a night in Zurich, and not the Vienna leg.'
    }
  },

  /* Le sostituzioni nella sequenza, per id. */
  edits: [
    {
      id: 'gapZurich',
      with: { type: 'gap', text: '3h 43m in Zürich HB, the afternoon you already had' }
    },
    {
      id: 'lx1064',
      with: {
        type: 'leg',
        id: 'ground',
        kind: 'train',
        mode: 'Train',
        service: '3 trains, 2 changes',
        seller: 'SBB, ÖBB, DB',
        ref: '3 tickets',
        from: { time: '14:33', place: 'Zürich HB' },
        to: { time: '19:04', place: 'München Hbf' }
      }
    },
    {
      id: 'gapMunich',
      with: { type: 'gap', text: 'Ten minutes on the U-Bahn to the hotel' }
    }
  ],

  /* L'albergo resta quello: cambia solo l'ora a cui ti aspettano. */
  adjust: {
    stay: { time: '19:35', service: 'One night, room held' }
  },

  marks: {
    ground: { state: 'new', tag: 'New', kind: 'cause' },
    stay: { state: 'fixed', tag: 'Moved', kind: 'effect' },
    rjx63: { state: 'fixed', tag: 'Confirmed', kind: 'effect' }
  }
};
