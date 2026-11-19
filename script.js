(() => {
  const progressBar = document.getElementById("progress-bar");
  let ticking = false;

  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    if (progressBar) progressBar.style.transform = `scaleX(${progress})`;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateProgress);
    }
  }, { passive: true });

  window.addEventListener("resize", updateProgress, { passive: true });
  updateProgress();

  const revealItems = document.querySelectorAll("[data-reveal]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -2% 0px",
  });

  revealItems.forEach((item) => observer.observe(item));
})();
