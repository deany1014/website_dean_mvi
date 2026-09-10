async function loadPartial(selector, path) {
  const response = await fetch(path);
  document.querySelector(selector).innerHTML = await response.text();
}

loadPartial("#site-header", "static/partials/header.html");
loadPartial("#site-footer", "static/partials/footer.html");