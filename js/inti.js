/* =========================
   SESSION GUARD
========================= */

const publicPages = ["login.html", "index.html"];

const currentPage = window.location.pathname.split("/").pop();

if(!publicPages.includes(currentPage)){
  if(localStorage.getItem("cbtLogin") !== "true"){
    window.location.href = "login.html";
  }
}


/* =========================
   SIDEBAR TOGGLE (mobile)
========================= */

document.addEventListener("DOMContentLoaded", () => {

  const toggleBtn = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");

  if(toggleBtn){
    toggleBtn.onclick = () => {
      sidebar.classList.toggle("show");
    };
  }

});
