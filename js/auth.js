document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();

  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  // demo login
  if(user && pass){
    localStorage.setItem("cbtLogin", "true");
    window.location.href = "dashboard.html";
  }
});
