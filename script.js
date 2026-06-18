// ============================================================
//  MOBILE NAV TOGGLE
// ============================================================
const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const navList = document.querySelector(".nav-list");

mobileNavToggle?.addEventListener("click", () => {
  navList.classList.toggle("active");
  const bars = mobileNavToggle.querySelectorAll(".bar");
  const isOpen = navList.classList.contains("active");
  bars[0].style.transform = isOpen ? "rotate(45deg) translate(7px, 7px)" : "";
  bars[1].style.opacity   = isOpen ? "0" : "1";
  bars[2].style.transform = isOpen ? "rotate(-45deg) translate(7px, -7px)" : "";
});

// Close mobile nav when a link is clicked
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navList.classList.remove("active");
    const bars = mobileNavToggle?.querySelectorAll(".bar");
    if (bars) {
      bars[0].style.transform = "";
      bars[1].style.opacity   = "1";
      bars[2].style.transform = "";
    }
  });
});

// ============================================================
//  ACTIVE NAV ON SCROLL
// ============================================================
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ============================================================
//  SCROLL REVEAL
// ============================================================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
