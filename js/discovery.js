/* Discovery game — full implementation in Task 5.
   Interim: reveal interactions so hidden spots are testable. */
export function initDiscovery() {
  document.querySelectorAll(".hidden-spot").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.add("found");
      const bubble = btn.querySelector(".bubble");
      bubble?.classList.add("show");
      clearTimeout(btn._bubbleTimer);
      btn._bubbleTimer = setTimeout(() => bubble?.classList.remove("show"), 2000);
    });
  });
  return { markFound() {}, found: new Set() };
}
