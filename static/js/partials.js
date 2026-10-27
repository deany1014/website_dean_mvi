async function loadPartial(selector, path) {
  const response = await fetch(path);
  document.querySelector(selector).innerHTML = await response.text();
}

loadPartial("#site-header", "../static/partials/header.html");
loadPartial("#site-footer", "../static/partials/footer.html");

/**
 * Geheime toetsenreeksen in plaats van knoppen:
 * - "dodogun"  start Kick Ass
 * - "nakijken" opent het stijlblad
 * Dit script staat op elke pagina, dus het werkt overal.
 *
 * Vul hieronder je eigen SITE_KEY in zodra je die hebt.
 */
(function () {
  // ---- instellingen ----
  var SITE_KEY = "REPLACE_WITH_YOUR_SITE_KEY"; // jouw echte kickassapp.com site key
  var RESET_DELAY_MS = 2000; // hoelang je hebt tussen toetsaanslagen voor het reset

  // ---- interne state ----
  var typed = ""; // de laatst getypte letters
  var resetTimer = null;

  function resetBuffer() {
    typed = "";
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

    typed += e.key.toLowerCase();

    // reset-timer: als je te langzaam typt, begint de reeks opnieuw
    clearTimeout(resetTimer);
    resetTimer = setTimeout(resetBuffer, RESET_DELAY_MS);

    // "nakijken" getypt: open het stijlblad
    if (typed.endsWith("nakijken")) {
      resetBuffer();
      window.location.href = "../stijlblad.html";
    }

    // "dodogun" getypt: start Kick Ass
    if (typed.endsWith("dodogun")) {
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