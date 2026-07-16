const writeups = [
  {
    name: "HTB Fluffy",
    difficulty: "Easy",
    logo: "writeups/fluffy/fluffy.png",
    href: "writeups/fluffy/htb-fluffy.html"
  },
  {
    name: "HTB Tombwatcher",
    difficulty: "Medium",
    logo: "writeups/tombwatcher/tombwatcher.png",
    href: "writeups/tombwatcher/htb-tombwatcher.html"
  }
];

function difficultyClassName(difficulty) {
  return "difficulty-" + difficulty.toLowerCase().replace(/\s+/g, "-");
}

function renderWriteups() {
  const grid = document.getElementById("writeupsGrid");
  if (!grid) return;

  grid.innerHTML = writeups.map(function (writeup) {
  return [
    '<article class="card">',
    '<div class="rank ' + difficultyClassName(writeup.difficulty) + '">' + writeup.difficulty + '</div>',

    '<div style="display: flex; align-items: center; gap: 50px;">',
    '<h3 style="margin: 0;">' + writeup.name + '</h3>',
    '<img src="' + writeup.logo + '" alt="' + writeup.name + ' logo" style="width: 110px; height: 110px; object-fit: contain;"/>',
    '</div>',

    '<div class="hero-actions" style="margin-top: 20px;">',
    '<a class="btn" href="' + writeup.href + '">Read Writeup</a>',
    '</div>',
    '</article>'
  ].join("");
}).join("");
}

function setupHashRouting() {
  const pages = Array.from(document.querySelectorAll(".page"));
  const navLinks = Array.from(document.querySelectorAll(".nav-link[data-route]"));
  const navContainer = document.getElementById("navLinks");
  const mobileToggle = document.getElementById("mobileToggle");

  function normalizeRoute(hash) {
    const route = (hash || "#about").replace("#", "").trim();
    return route || "about";
  }

  function setRoute() {
    const route = normalizeRoute(window.location.hash);
    const validRoute = pages.some(function (page) {
      return page.dataset.page === route;
    }) ? route : "about";

    pages.forEach(function (page) {
      page.classList.toggle("active", page.dataset.page === validRoute);
    });

    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.dataset.route === validRoute);
    });

    if (navContainer) navContainer.classList.remove("open");
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  if (mobileToggle && navContainer) {
    mobileToggle.addEventListener("click", function () {
      navContainer.classList.toggle("open");
    });
  }

  window.addEventListener("hashchange", setRoute);
  setRoute();
}

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

  renderWriteups();
  setupHashRouting();
  setupMatrix();
});