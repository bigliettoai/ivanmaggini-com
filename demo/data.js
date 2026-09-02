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
      kind: 'flight',
      mode: 'Flight',
      service: 'LX 1064',
      seller: 'Swiss',
      ref: 'booking XQ7T2M',
      from: { time: '14:05', place: 'Zürich Airport' },
      to: { time: '15:10', place: 'Munich Airport' }
    },

    { type: 'gap', text: 'S-Bahn into the city, 45 minutes' },

    {
      type: 'leg',
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
