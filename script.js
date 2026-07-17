const carrossel = document.getElementById("carrossel");
const anterior = document.getElementById("anterior");
const proximo = document.getElementById("proximo");

function larguraDoPasso() {
  const slide = carrossel.querySelector(".slide");
  if (!slide) return 300;
  const gap = parseInt(getComputedStyle(carrossel).gap || "0", 10);
  return slide.getBoundingClientRect().width + gap;
}

anterior.addEventListener("click", () => {
  carrossel.scrollBy({ left: -larguraDoPasso(), behavior: "smooth" });
});

proximo.addEventListener("click", () => {
  carrossel.scrollBy({ left: larguraDoPasso(), behavior: "smooth" });
});
