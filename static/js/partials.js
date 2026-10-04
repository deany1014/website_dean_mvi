async function loadPartial(selector, path) {
  const response = await fetch(path);
  document.querySelector(selector).innerHTML = await response.text();
}

loadPartial("#site-header", "../static/partials/header.html");
loadPartial("#site-footer", "../static/partials/footer.html");

/**
 * Start Kick Ass via een geheime toetsenreeks in plaats van een knop.
 * Voeg dit script toe op elke pagina (bijv. samen met je partials,
 * of los in header.html) zodat het overal actief is.
 *
 * Vul hieronder je eigen SITE_KEY in zodra je die hebt.
 */
(function () {
  // ---- instellingen ----
  var SITE_KEY = "REPLACE_WITH_YOUR_SITE_KEY"; // jouw echte kickassapp.com site key
  var SEQUENCE = ["d", "o", "d", "o", "g", "u", "n"]; // toetsenreeks die het spel triggert
  var RESET_DELAY_MS = 2000; // hoelang je hebt tussen toetsaanslagen voor het reset

  // ---- interne state ----
  var buffer = [];
  var resetTimer = null;

  function resetBuffer() {
    buffer = [];
  }

  function loadKickAss() {
    window.KICKASS_SITE_KEY = SITE_KEY;
    var el = document.createElement("script");
    el.src = "https://hi.kickassapp.com/kickass-mysite.js";
    document.body.appendChild(el);
  }

  function onKeydown(e) {
    // negeer input in tekstvelden, zodat typen elders niet per ongeluk triggert
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || e.target.isContentEditable) {
      return;
    }

    var key = e.key.toLowerCase();
    buffer.push(key);

    // reset-timer: als je te langzaam typt, begint de reeks opnieuw
    clearTimeout(resetTimer);
    resetTimer = setTimeout(resetBuffer, RESET_DELAY_MS);

    // houd de buffer even lang als de reeks
    if (buffer.length > SEQUENCE.length) {
      buffer.shift();
    }

    // vergelijk buffer met de gewenste reeks
    var matches = buffer.length === SEQUENCE.length &&
      buffer.every(function (k, i) { return k === SEQUENCE[i]; });

    if (matches) {
      resetBuffer();

      // Reset de globale variabele zodat de game opnieuw kan initialiseren
      if (window.KICKASSGAME) {
        window.KICKASSGAME = null;
      }

      // Verwijder eventueel een eerder geladen script-element
      var existingScript = document.querySelector('script[src="https://hi.kickassapp.com/kickass-mysite.js"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Start de game opnieuw op
      loadKickAss();
    }
  }

  document.addEventListener("keydown", onKeydown, false);
})();