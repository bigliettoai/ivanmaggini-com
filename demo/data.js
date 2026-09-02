/* ------------------------------------------------------------------
   Biglietto, demo dimostrativa. I dati.

   Tutto quello che si vede a schermo nasce da qui: quattro prenotazioni
   finte, scritte a mano, sempre le stesse. Non c'è nessuna chiamata di
   rete, nessun servizio esterno, nessun orario calcolato al momento.
   Rilanciata domani, la demo dice esattamente le stesse cose di oggi.

   Lo scenario: Milano - Vienna in due giorni, quattro prenotazioni
   comprate da quattro venditori diversi. I riferimenti di prenotazione
   hanno formati diversi apposta: è il segno che arrivano da sistemi
   che non si parlano.

   Sui nomi: le città in inglese (Milan, Zurich, Munich, Vienna), le
   stazioni con il nome che hanno sul biglietto (Zürich HB, München
   Hbf, Wien Hbf), gli aeroporti con il nome inglese. È la regola che
   usano i prodotti veri, ed è l'unica che non produce ibridi.
   ------------------------------------------------------------------ */

var TRIP = {

  route: { from: 'Milan', to: 'Vienna' },
  dates: 'Thursday 12 to Friday 13 March',
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

    { type: 'day', label: 'Thursday 12 March' },

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

    { type: 'day', label: 'Friday 13 March' },

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
