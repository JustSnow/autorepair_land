import "./style.css";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

initBooking();
initStickyCta();
document.querySelectorAll("[data-carousel]").forEach(initCarousel);
initPointerAtmosphere();
initStepsStagger();

function initBooking() {
  const dialog = document.getElementById("booking");
  const form = dialog.querySelector("[data-booking-form]");
  const toast = document.querySelector("[data-toast]");
  // Without <dialog> support the CTA links keep their #zapis fallback.
  if (typeof dialog.showModal !== "function") return;

  document.querySelectorAll("[data-open-booking]").forEach((cta) => {
    cta.addEventListener("click", (event) => {
      event.preventDefault();
      dialog.showModal();
    });
  });

  dialog.querySelector("[data-booking-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  // Demo only: no network transport, by spec.
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    dialog.close();
    form.reset();
    showToast(toast, "Заявка отправлена. Мы перезвоним, чтобы подтвердить время.");
  });
}

function initStickyCta() {
  const cta = document.querySelector(".sticky-cta");
  const heroActions = document.querySelector(".hero__actions");
  if (!cta || !heroActions || !("IntersectionObserver" in window)) return;
  new IntersectionObserver(([entry]) => cta.classList.toggle("is-tucked", entry.isIntersecting)).observe(
    heroActions,
  );
}

let toastTimer;
function showToast(toast, message) {
  toast.textContent = message;
  void toast.offsetWidth; // flush the :empty → visible switch so the entrance transition runs
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => (toast.textContent = ""), 300);
  }, 4500);
}

function initCarousel(root) {
  const track = root.querySelector(".carousel__track");
  const controls = document.querySelector(`[data-carousel-controls="${root.dataset.carousel}"]`);
  if (!track || !controls) return;
  const prev = controls.querySelector("[data-carousel-prev]");
  const next = controls.querySelector("[data-carousel-next]");

  const step = () => {
    const slide = track.querySelector(".carousel__slide");
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return slide ? slide.getBoundingClientRect().width + gap : track.clientWidth;
  };
  const scrollByStep = (dir) =>
    track.scrollBy({ left: dir * step(), behavior: reduceMotion.matches ? "auto" : "smooth" });
  const update = () => {
    const max = track.scrollWidth - track.clientWidth - 1;
    prev.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= max;
    controls.hidden = max <= 0;
  };

  prev.addEventListener("click", () => scrollByStep(-1));
  next.addEventListener("click", () => scrollByStep(1));
  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

function initPointerAtmosphere() {
  const root = document.querySelector("[data-pointer-atmosphere]");
  if (!root) return;
  const hero = root.parentElement;
  const fine = window.matchMedia("(pointer: fine)");
  const layers = root.querySelectorAll("[data-depth]");
  const max = 24;
  const reset = () => layers.forEach((el) => (el.style.transform = ""));
  if (reduceMotion.matches || !fine.matches) return;

  let frame = 0;
  // Listen on the hero (the atmosphere sits under the content and gets no pointer events).
  const onMove = (event) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const r = hero.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - 0.5;
      const y = (event.clientY - r.top) / r.height - 0.5;
      layers.forEach((el) => {
        const d = Number(el.dataset.depth) || 0;
        el.style.transform = `translate3d(${x * max * d}px, ${y * max * d}px, 0)`;
      });
    });
  };
  hero.addEventListener("pointermove", onMove);
  reduceMotion.addEventListener("change", () => {
    if (!reduceMotion.matches) return;
    hero.removeEventListener("pointermove", onMove);
    cancelAnimationFrame(frame);
    reset();
  });
}

function initStepsStagger() {
  const list = document.querySelector("[data-stagger]");
  if (!list || reduceMotion.matches || !("IntersectionObserver" in window)) return;
  list.classList.add("is-armed");
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      list.classList.add("is-in");
      io.disconnect();
    },
    { threshold: 0.25 },
  );
  io.observe(list);
}
