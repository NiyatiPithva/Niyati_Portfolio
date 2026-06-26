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
//  Fix: use the BOTTOM of the page to detect last section
// ============================================================
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const scrollY   = window.scrollY;
  const winHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  // If user is at (or very near) the bottom, force "contact" active
  if (scrollY + winHeight >= docHeight - 10) {
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#contact") link.classList.add("active");
    });
    return;
  }

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    console.log("sectionTop ..",sectionTop);
    
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
      console.log("current  .",current);
      
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) link.classList.add("active");
  });
}

window.addEventListener("scroll", updateActiveNav);

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