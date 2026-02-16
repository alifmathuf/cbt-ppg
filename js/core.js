/* =================================
   CORE GLOBAL SCRIPT
   digunakan di semua halaman
================================= */


/* ========= USER STORAGE ========= */

// ambil user dari localStorage
function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

// simpan user
function setUser(data) {
  localStorage.setItem("user", JSON.stringify(data));
}


/* ========= AVATAR GENERATOR ========= */

function generateAvatar(name) {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#2563eb";
  ctx.fillRect(0, 0, 64, 64);

  ctx.fillStyle = "#fff";
  ctx.font = "28px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(name.charAt(0).toUpperCase(), 32, 36);

  return canvas.toDataURL();
}

function applyAvatar(imgElementId) {
  const user = getUser();
  if (!user) return;

  const avatar = generateAvatar(user.name);
  const img = document.getElementById(imgElementId);
  if (img) img.src = avatar;
}


/* ========= SIDEBAR TOGGLE ========= */

function initSidebarToggle() {
  const btn = document.getElementById("menuToggle");
  const sidebar = document.querySelector(".sidebar");

  if (!btn || !sidebar) return;

  btn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
}


/* ========= ACTIVE MENU ========= */

function setActiveMenu() {
  const links = document.querySelectorAll(".menu a");
  const url = window.location.pathname.split("/").pop();

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === url) {
      link.classList.add("active");
    }
  });
}


/* ========= SAFE DOM READY ========= */

document.addEventListener("DOMContentLoaded", () => {
  initSidebarToggle();
  setActiveMenu();
});
