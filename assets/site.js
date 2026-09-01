/* Un solo comportamento in tutto il sito.

   Gli stati sul tabellone si fermano come le palette di un tabellone di
   partenze: passano per qualche carattere sbagliato e poi si assestano,
   una riga dopo l'altra. Succede una volta sola, quando il blocco entra
   in vista, e non succede affatto se il sistema operativo chiede meno
   movimento o se manca IntersectionObserver.

   Il testo definitivo resta sempre nel documento in una copia riservata
   ai lettori vocali: quello che si scompone è solo la parte visibile,
   marcata aria-hidden. */
(function () {
  'use strict';

  var celle = [].slice.call(document.querySelectorAll('[data-flip]'));
  if (!celle.length) return;

  var menoMovimento = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (menoMovimento || !('IntersectionObserver' in window) || !('requestAnimationFrame' in window)) return;

  var GLIFI = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var PASSO = 45;   // millisecondi fra un fotogramma e l'altro
  var GIRI = 7;     // quanti fotogrammi prima che una lettera si fermi

  celle.forEach(function (cella, indice) {
    var finale = cella.textContent;

    var vocale = document.createElement('span');
    vocale.className = 'sr';
    vocale.textContent = finale;

    var visibile = document.createElement('span');
    visibile.setAttribute('aria-hidden', 'true');
    visibile.textContent = finale;

    cella.textContent = '';
    cella.appendChild(vocale);
    cella.appendChild(visibile);
    cella.dataset.ritardo = String(indice * 140);
  });

  function scomponi(cella) {
    var visibile = cella.lastChild;
    var finale = cella.firstChild.textContent;
    var lettere = finale.split('');
    var fermata = lettere.map(function (_, i) { return GIRI + i * 1.6; });
    var giro = 0;
    var inizio = null;

    function fotogramma(ora) {
      if (inizio === null) inizio = ora;
      if (ora - inizio < giro * PASSO) return requestAnimationFrame(fotogramma);
      giro++;

      var testo = '';
      var finito = true;
      for (var i = 0; i < lettere.length; i++) {
        var c = lettere[i];
        if (giro >= fermata[i] || c === ' ' || c === ',' || c === '.') {
          testo += c;
        } else {
          finito = false;
          testo += GLIFI.charAt((Math.random() * GLIFI.length) | 0);
        }
      }
      visibile.textContent = testo;
      if (!finito) requestAnimationFrame(fotogramma);
      else visibile.textContent = finale;
    }

    requestAnimationFrame(fotogramma);
  }

  var osservatore = new IntersectionObserver(function (voci) {
    voci.forEach(function (voce) {
      if (!voce.isIntersecting) return;
      osservatore.unobserve(voce.target);
      window.setTimeout(function () { scomponi(voce.target); }, Number(voce.target.dataset.ritardo || 0));
    });
  }, { threshold: 0.45 });

  celle.forEach(function (cella) { osservatore.observe(cella); });
})();
