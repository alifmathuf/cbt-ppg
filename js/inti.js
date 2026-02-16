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
