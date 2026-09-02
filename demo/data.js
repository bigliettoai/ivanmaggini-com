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

    { type: 'gap', text: '3h 15m in Zurich, then 12 minutes out to the airport' },

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

    { type: 'gap', text: 'S-Bahn into the city, 45 minutes' },

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
