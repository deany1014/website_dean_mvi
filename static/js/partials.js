async function loadPartial(selector, path) {
  const target = document.querySelector(selector);
  if (!target) return;

  const response = await fetch(path);
  if (!response.ok) throw new Error(`Partial kon niet worden geladen: ${path}`);
  target.innerHTML = await response.text();

  if (selector === "#site-header") {
    const menuButton = target.querySelector(".menu-toggle");
    const menu = target.querySelector(".main-menu");
    menuButton?.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menu.classList.toggle("is-open", !isOpen);
    });

    menu?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuButton?.setAttribute("aria-expanded", "false");
        menu.classList.remove("is-open");
      });
    });
  }
}

Promise.all([
  loadPartial("#site-header", "static/partials/header.html"),
  loadPartial("#site-footer", "static/partials/footer.html"),
]).catch((error) => console.error(error));