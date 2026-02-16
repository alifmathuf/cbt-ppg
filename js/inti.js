/* =========================
   GLOBAL UI CONTROLLER
========================= */

document.addEventListener("DOMContentLoaded", () => {

  const toggleBtn = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");

  /* ===== Sidebar Toggle ===== */
  if(toggleBtn){
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("show");
    });
  }

  /* ===== Auto close on mobile menu click ===== */
  const links = sidebar ? sidebar.querySelectorAll("a") : [];
  links.forEach(link => {
    link.addEventListener("click", () => {
      if(window.innerWidth < 900){
        sidebar.classList.remove("show");
      }
    });
  });

  /* ===== Close when click outside ===== */
  document.addEventListener("click", (e) => {
    if(window.innerWidth < 900 && sidebar.classList.contains("show")){
      if(!sidebar.contains(e.target) && !toggleBtn.contains(e.target)){
        sidebar.classList.remove("show");
      }
    }
  });

});

document.addEventListener("DOMContentLoaded", () => {

  /* SESSION GUARD */
  const publicPages = ["login.html", "index.html"];
  const currentPage = window.location.pathname.split("/").pop();

  if(!publicPages.includes(currentPage)){
    if(localStorage.getItem("cbtLogin") !== "true"){
      window.location.href = "login.html";
      return; // hentikan eksekusi
    }
  }

  /* SIDEBAR TOGGLE */
  const toggleBtn = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");

  if(toggleBtn && sidebar){
    toggleBtn.onclick = () => {
      sidebar.classList.toggle("show");
    };
  }

});
