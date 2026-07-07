const searchInput = document.querySelector("#searchInput");
const table = document.querySelector("#dashboardTable");
const modeButtons = document.querySelectorAll(".segment");
const toggles = document.querySelectorAll(".toggle");

function applyMode(mode) {
  const cells = table.querySelectorAll("[data-col]");
  cells.forEach((cell) => {
    const col = cell.dataset.col;
    const shouldShow = mode === "all" || col === mode;
    cell.classList.toggle("hidden-col", !shouldShow);
  });
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modeButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    applyMode(button.dataset.mode);
  });
});

toggles.forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest(".division-row");
    const division = row.dataset.division;
    const isOpen = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isOpen));
    button.textContent = isOpen ? "▶" : "▼";

    table.querySelectorAll(`[data-parent="${division}"]`).forEach((employeeRow) => {
      employeeRow.classList.toggle("is-hidden", isOpen);
    });
  });
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  const rows = table.querySelectorAll("tbody tr");

  rows.forEach((row) => {
    if (row.classList.contains("total-row")) {
      row.classList.remove("is-hidden");
      return;
    }

    const text = row.textContent.toLowerCase();
    row.classList.toggle("is-hidden", query.length > 0 && !text.includes(query));
  });
});
