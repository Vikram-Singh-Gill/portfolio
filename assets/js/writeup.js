function setupMatrix() {
  const canvas = document.getElementById("matrixCanvas");
  const ctx = canvas ? canvas.getContext("2d") : null;
  if (!canvas || !ctx) return;

  const glyphs = "01LDAPADKERBEROSIDENTITYCLOUDIAMK8SSECURITY".split("");
  let columns = [];
  const fontSize = 16;

  function resizeMatrix() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.floor(window.innerWidth / fontSize);
    columns = Array.from({ length: count }, function () {
      return Math.floor(Math.random() * window.innerHeight / fontSize);
    });
  }

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.font = fontSize + "px SFMono-Regular, Consolas, monospace";
    ctx.fillStyle = "rgba(41, 151, 255, 0.16)";

    columns.forEach(function (y, index) {
      const text = glyphs[Math.floor(Math.random() * glyphs.length)];
      const x = index * fontSize;
      ctx.fillText(text, x, y * fontSize);

      if (y * fontSize > window.innerHeight && Math.random() > 0.975) {
        columns[index] = 0;
      } else {
        columns[index] = y + 1;
      }
    });

    requestAnimationFrame(drawMatrix);
  }

  window.addEventListener("resize", resizeMatrix);
  resizeMatrix();
  drawMatrix();
}

document.addEventListener("DOMContentLoaded", function () {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const mobileToggle = document.getElementById("mobileToggle");
  const navContainer = document.getElementById("navLinks");

  if (mobileToggle && navContainer) {
    mobileToggle.addEventListener("click", function () {
      navContainer.classList.toggle("open");
    });
  }

  setupMatrix();
});