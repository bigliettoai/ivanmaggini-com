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
     partenza, sotto l'arrivo; a destra chi l'ha venduta e con quale
     riferimento, che ogni venditore scrive a modo suo. */
  function legRow(item) {
    var li = el('li', 'item leg');
    li.setAttribute('data-kind', item.kind);

    var top = el('div', 'row');
    top.appendChild(el('span', 'node'));
    top.appendChild(el('time', 't', item.from.time));
    top.appendChild(el('span', 'place', item.from.place));
    top.appendChild(modeCell(item));
    top.appendChild(el('span', 'seller', item.seller));

    var bottom = el('div', 'row');
    bottom.appendChild(el('span', 'node hollow'));
    bottom.appendChild(el('time', 't', item.to.time));
    bottom.appendChild(el('span', 'place', item.to.place));
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

  function drawRail(trip) {
    var rail = document.getElementById('rail');
    rail.textContent = '';

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

  function drawSequence(trip) {
    var seq = document.getElementById('seq');
    seq.textContent = '';
    trip.items.forEach(function (item) {
      var make = ROW[item.type];
      if (make) { seq.appendChild(make(item)); }
    });
  }

  /* --- il passo della demo -------------------------------------------
     Un passo è una funzione che mette lo schermo in un certo stato. Per
     ora ce n'è uno solo: il viaggio come l'utente l'ha comprato. */

  var STEPS = [
    function tripAsBooked() {
      drawRail(TRIP);
      drawSequence(TRIP);
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
