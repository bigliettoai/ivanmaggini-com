/* ------------------------------------------------------------------
   Biglietto, demo dimostrativa. Il motore.

   Due cose sole: disegna quello che c'è in data.js, e tiene il passo
   della demo. Il passo lo do io: barra spaziatrice, freccia destra o
   un click avanzano di uno, R rimette tutto all'inizio. Niente si
   muove da solo, niente parte a tempo.

   Nessuna rete: qui dentro non c'è nessun fetch, nessun
   XMLHttpRequest, nessun tag caricato a runtime. Nessuna memoria:
   nessun localStorage, nessun sessionStorage, nessun cookie. Chiusa
   la finestra, della demo non resta niente.
   ------------------------------------------------------------------ */

(function () {
  'use strict';

  /* --- costruttori minimi ------------------------------------------ */

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (text != null) { n.textContent = text; }
    return n;
  }

  /* I segni del mezzo di trasporto. Sono disegnati qui, non caricati:
     tre forme monolineari, niente librerie di icone. */
  var GLYPH = {
    train:
      '<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" ' +
      'stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">' +
      '<rect x="2.8" y="2.4" width="10.4" height="9" rx="1.6"/>' +
      '<path d="M2.8 6.6h10.4"/><path d="M5.2 11.4 3.4 14"/><path d="M10.8 11.4 12.6 14"/>' +
      '</svg>',
    flight:
      '<svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">' +
      '<polygon points="8,1 8.8,2.3 8.8,5.6 14,8.4 14,9.7 8.8,8.3 8.8,11.3 10.4,12.5 ' +
      '10.4,13.5 8,12.9 5.6,13.5 5.6,12.5 7.2,11.3 7.2,8.3 2,9.7 2,8.4 7.2,5.6 7.2,2.3"/>' +
      '</svg>',
    stay:
      '<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" ' +
      'stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M2 13V4"/><path d="M2 9.4h10.1a1.9 1.9 0 0 1 1.9 1.9V13"/>' +
      '<path d="M4.4 9.4V7.1h2.8v2.3"/>' +
      '</svg>'
  };

  /* Anche la freccia della tratta è disegnata, non scritta: un glifo
     preso da un carattere qualsiasi cambia forma da un computer
     all'altro, questa no. */
  var ARROW =
    '<svg class="arrow" viewBox="0 0 26 14" aria-hidden="true" fill="none" ' +
    'stroke="currentColor" stroke-width="1.7" stroke-linecap="square">' +
    '<path d="M0.9 7h22.6"/><path d="M17.7 1.5 23.5 7l-5.8 5.5"/>' +
    '</svg>';

  function modeCell(item) {
    var cell = el('span', 'mode');
    cell.innerHTML = GLYPH[item.kind] || '';
    cell.appendChild(el('span', null, item.mode));
    return cell;
  }

  /* --- le righe della sequenza -------------------------------------- */

  /* Una prenotazione: due righe sulla stessa griglia. Sopra la
     partenza, sotto l'arrivo; in mezzo la colonna dello stato, che
     resta vuota finché non c'è niente da dire; a destra chi l'ha
     venduta e con quale riferimento, che ogni venditore scrive a modo
     suo. */
  function legRow(item, mark) {
    var li = el('li', 'item leg');
    li.setAttribute('data-kind', item.kind);

    var top = el('div', 'row');
    top.appendChild(el('span', 'node'));
    top.appendChild(el('time', 't', item.from.time));
    top.appendChild(el('span', 'place', item.from.place));
    top.appendChild(mark ? el('span', 'tag ' + mark.kind, mark.tag) : el('span'));
    top.appendChild(modeCell(item));
    top.appendChild(el('span', 'seller', item.seller));

    var bottom = el('div', 'row');
    bottom.appendChild(el('span', 'node hollow'));
    bottom.appendChild(el('time', 't', item.to.time));
    bottom.appendChild(el('span', 'place', item.to.place));
    bottom.appendChild(el('span'));
    bottom.appendChild(el('span', 'meta', item.service));
    bottom.appendChild(el('span', 'meta', item.ref));

    li.appendChild(top);
    li.appendChild(bottom);
    return li;
  }

  /* Il tempo fra due prenotazioni. Non ha nodi: la linea passa e basta,
     perché anche l'attesa fa parte del viaggio. */
  function gapRow(item) {
    var li = el('li', 'item gap');
    li.appendChild(el('p', null, item.text));
    return li;
  }

  /* Il cambio di giornata: un trattino che attraversa la linea. */
  function dayRow(item) {
    var li = el('li', 'item day');
    var wrap = el('div', 'mark-row');
    wrap.appendChild(el('span', 'node'));
    wrap.appendChild(el('p', null, item.label));
    li.appendChild(wrap);
    return li;
  }

  var ROW = { leg: legRow, gap: gapRow, day: dayRow };

  /* --- le due colonne ------------------------------------------------ */

  function railElement() {
    var rail = document.getElementById('rail');
    rail.textContent = '';
    return rail;
  }

  function drawTripRail(trip) {
    var rail = railElement();
    rail.removeAttribute('data-board');

    rail.appendChild(el('p', 'label', 'Your trip'));

    var route = el('h1', 'route');
    route.setAttribute('aria-label', trip.route.from + ' to ' + trip.route.to);
    route.appendChild(el('span', null, trip.route.from));
    var to = el('span');
    to.innerHTML = ARROW;
    to.appendChild(document.createTextNode(trip.route.to));
    route.appendChild(to);
    rail.appendChild(route);

    rail.appendChild(el('p', 'dates', trip.dates));
    rail.appendChild(el('p', 'lede', trip.lede));

    var facts = el('dl', 'facts');
    trip.facts.forEach(function (pair) {
      var row = el('div');
      row.appendChild(el('dt', null, pair[0]));
      row.appendChild(el('dd', null, pair[1]));
      facts.appendChild(row);
    });
    rail.appendChild(facts);
  }

  /* La spalla diventa il blocco nero, e da lì in poi è il sistema che
     parla. La forma è sempre la stessa: lo stato in ambra, di cosa si
     parla, una riga di prosa, e due blocchi con l'etichetta sopra.
     L'ordine dei due blocchi non cambia mai, ed è quello che conta: la
     conseguenza prima della proposta, perché è la conseguenza la cosa
     che nessun altro ti dice. */
  function drawBoard(board) {
    var rail = railElement();
    rail.setAttribute('data-board', '');

    rail.appendChild(el('p', 'state', board.state));
    rail.appendChild(el('p', 'subject', board.subject));
    rail.appendChild(el('p', 'noticed', board.noticed));

    var breaks = el('div', 'block');
    breaks.appendChild(el('p', 'label', board.breaks.label));
    var list = el('ul', 'consequences');
    board.breaks.items.forEach(function (line) {
      list.appendChild(el('li', null, line));
    });
    breaks.appendChild(list);
    rail.appendChild(breaks);

    var offer = el('div', 'block');
    offer.appendChild(el('p', 'label', board.offer.label));
    offer.appendChild(el('p', 'offer', board.offer.text));
    rail.appendChild(offer);
  }

  /* --- la colonna di destra ------------------------------------------ */

  function stage() {
    var trip = document.getElementById('trip');
    trip.textContent = '';
    return trip;
  }

  /* Una prenotazione sostituita o corretta. L'originale non viene mai
     toccato: il viaggio comprato resta uno solo, in cima a data.js. */
  function rewrite(item, change) {
    if (!change || !item.id) { return item; }

    var i;
    if (change.edits) {
      for (i = 0; i < change.edits.length; i++) {
        if (change.edits[i].id === item.id) { return change.edits[i].with; }
      }
    }

    var tweak = change.adjust && change.adjust[item.id];
    if (!tweak) { return item; }

    return {
      type: item.type,
      id: item.id,
      kind: item.kind,
      mode: item.mode,
      service: tweak.service || item.service,
      seller: item.seller,
      ref: item.ref,
      from: { time: tweak.time || item.from.time, place: item.from.place },
      to: item.to
    };
  }

  /* La sequenza disegna sempre lo stesso viaggio. Quello che cambia è
     cosa gli è successo: niente, una rottura, o una riparazione. Da
     'brokenFrom' in giù tutto viene segnato come non più valido,
     comprese le attese e il cambio di giornata, così la catena si vede
     scendere invece di essere raccontata. */
  function drawSequence(trip, change) {
    var seq = el('ol', 'seq');
    var marks = (change && change.marks) || {};
    var from = change && change.brokenFrom;
    var broken = false;

    trip.items.forEach(function (original) {
      var item = rewrite(original, change);
      var make = ROW[item.type];
      if (!make) { return; }

      var mark = item.id ? marks[item.id] : null;
      var li = make(item, mark);

      if (from && item.id === from) { broken = true; }
      if (broken) { li.setAttribute('data-broken', ''); }
      if (mark) { li.setAttribute('data-state', mark.state); }

      seq.appendChild(li);
    });

    stage().appendChild(seq);
  }

  /* --- le due risposte, affiancate ------------------------------------
     Stessa grammatica della sequenza, più stretta: la linea, i nodi
     pieni e vuoti, gli orari incolonnati. Quella della compagnia aerea
     è disegnata come un vicolo cieco, con la linea sbiadita. */

  function miniLeg(leg) {
    if (leg.change) {
      var pause = el('li', 'item gap');
      pause.appendChild(el('p', null, leg.change));
      return pause;
    }

    var li = el('li', 'item leg');

    var top = el('div', 'row');
    top.appendChild(el('span', 'node'));
    top.appendChild(el('time', 't', leg.from.time));
    top.appendChild(el('span', 'place', leg.from.place));

    var bottom = el('div', 'row');
    bottom.appendChild(el('span', 'node hollow'));
    bottom.appendChild(el('time', 't', leg.to.time));
    bottom.appendChild(el('span', 'place', leg.to.place));

    li.appendChild(top);
    li.appendChild(bottom);
    li.appendChild(el('p', 'mini-meta', leg.meta));
    return li;
  }

  function drawComparison(alternative) {
    var compare = el('div', 'compare');

    alternative.options.forEach(function (option) {
      var column = el('section', 'option');
      column.setAttribute('data-tone', option.tone);

      column.appendChild(el('p', 'opt-label', option.label));

      /* La cifra è la stessa misura per tutte e due le colonne: quanto
         si arriva tardi. È l'unico confronto che serve. */
      column.appendChild(el('p', 'opt-figure', option.figure));
      column.appendChild(el('p', 'opt-caption', option.caption));

      var seq = el('ol', 'seq mini');
      option.legs.forEach(function (leg) { seq.appendChild(miniLeg(leg)); });
      column.appendChild(seq);

      if (option.costs) {
        var costs = el('ul', 'cost');
        option.costs.forEach(function (line) { costs.appendChild(el('li', null, line)); });
        column.appendChild(costs);
      }

      compare.appendChild(column);
    });

    stage().appendChild(compare);
  }

  /* --- il passo della demo -------------------------------------------
     Un passo è una funzione che mette lo schermo in un certo stato. Per
     ora ce n'è uno solo: il viaggio come l'utente l'ha comprato. */

  var STEPS = [

    /* 1. Il viaggio come l'utente l'ha comprato. */
    function tripAsBooked() {
      drawTripRail(TRIP);
      drawSequence(TRIP, null);
    },

    /* 2. Il volo salta, e con lui la notte a Monaco e il treno per
          Vienna. Cambia la spalla e cambia la sequenza: la stessa
          schermata, letta due volte. */
    function theCancellation() {
      drawBoard(DISRUPTION.board);
      drawSequence(TRIP, DISRUPTION);
    },

    /* 3. Le due risposte una accanto all'altra: quella di chi conosce
          solo il proprio volo, e quella di chi ha davanti tutto il
          viaggio. Qui la sequenza lascia il posto al confronto. */
    function theWayRound() {
      drawBoard(ALTERNATIVE.board);
      drawComparison(ALTERNATIVE);
    },

    /* 4. Il viaggio ricomposto. Torna la sequenza intera, con la linea
          di nuovo continua da cima a fondo: le tre righe che dicevano
          Cancelled, Out of reach e At risk adesso dicono New, Moved e
          Confirmed, nelle stesse identiche posizioni. */
    function theTripPutBack() {
      drawBoard(RESOLUTION.board);
      drawSequence(TRIP, RESOLUTION);
    }
  ];

  var at = 0;

  function show(i) {
    at = Math.max(0, Math.min(i, STEPS.length - 1));
    STEPS[at]();

    document.getElementById('step').textContent =
      (at + 1) + ' / ' + STEPS.length;

    var hint = document.getElementById('hint');
    var last = at === STEPS.length - 1;
    hint.textContent = last ? 'R to start over' : 'Space to continue, R to start over';
    hint.hidden = STEPS.length < 2;
  }

  function next() { if (at < STEPS.length - 1) { show(at + 1); } }
  function reset() { show(0); }

  /* Avanzo io: un tasto o un click. Niente timer, niente autoplay. */
  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) { return; }

    if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'ArrowRight' ||
        e.key === 'PageDown' || e.key === 'Enter') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      if (at > 0) { show(at - 1); }
    } else if (e.key === 'r' || e.key === 'R' || e.key === 'Home') {
      e.preventDefault();
      reset();
    }
  });

  document.getElementById('stage').addEventListener('click', function () {
    next();
  });

  show(0);

})();
