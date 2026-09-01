/* Un solo comportamento in tutto il sito.

   L'indirizzo email nel blocco nero entra una lettera per volta, salendo da
   una maschera: è la stessa cosa che fa la testata, applicata a un carattere
   alla volta invece che a una riga. Le lettere sono sempre quelle giuste e
   non passano mai per caratteri sbagliati, perché un indirizzo scomposto
   sembra un errore, non un tabellone.

   Succede una volta sola, quando il blocco entra in vista. Non succede
   affatto se il sistema operativo chiede meno movimento, se mancano gli
   strumenti del browser, o se il foglio di stile non risulta applicato: una
   pagina già in difficoltà non va peggiorata.

   Il testo resta leggibile per i lettori vocali attraverso aria-label
   sull'elemento, mentre le lettere spezzettate sono marcate aria-hidden. */
(function () {
  'use strict';

  var righe = [].slice.call(document.querySelectorAll('[data-rise]'));
  if (!righe.length) return;

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  // Se il foglio di stile non è arrivato la pagina è già in difficoltà: senza
  // le regole di `.rise` le lettere resterebbero spostate in basso e basta.
  if (getComputedStyle(document.documentElement).getPropertyValue('--paper').trim() === '') return;

  righe.forEach(function (riga) {
    var testo = riga.textContent.trim();
    if (!testo) return;

    riga.setAttribute('aria-label', testo);

    var involucro = document.createElement('span');
    involucro.setAttribute('aria-hidden', 'true');

    for (var i = 0; i < testo.length; i++) {
      var maschera = document.createElement('span');
      maschera.className = 'rise';
      var lettera = document.createElement('i');
      lettera.style.setProperty('--c', String(i));
      // Lo spazio in un elemento inline verrebbe collassato: serve quello unificatore.
      lettera.textContent = testo.charAt(i) === ' ' ? ' ' : testo.charAt(i);
      maschera.appendChild(lettera);
      involucro.appendChild(maschera);
    }

    riga.textContent = '';
    riga.appendChild(involucro);
    riga.classList.add('in-attesa');
  });

  function mostra(riga) {
    if (!riga.classList.contains('in-attesa')) return;
    osservatore.unobserve(riga);
    riga.classList.remove('in-attesa');
    riga.classList.add('parte');
  }

  var osservatore = new IntersectionObserver(function (voci) {
    voci.forEach(function (voce) { if (voce.isIntersecting) mostra(voce.target); });
  }, { threshold: 0.4 });

  righe.forEach(function (riga) {
    osservatore.observe(riga);
    // Rete di sicurezza: l'indirizzo email è l'unico modo per contattare, e
    // non può restare invisibile se per qualsiasi motivo l'osservatore non
    // scatta. Dopo tre secondi compare comunque.
    window.setTimeout(function () { mostra(riga); }, 3000);
  });
})();
