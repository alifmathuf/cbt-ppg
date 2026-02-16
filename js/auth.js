/* ===============================
   AUTH SYSTEM - CLEAN VERSION
================================ */

// simpan user
function saveUser(user){
  localStorage.setItem("cbtUser", JSON.stringify(user));
}

// ambil user
function getUser(){
  return JSON.parse(localStorage.getItem("cbtUser"));
}

// cek login
function isLoggedIn(){
  return !!localStorage.getItem("cbtUser");
}

// logout
function logout(){
  localStorage.removeItem("cbtUser");
  window.location.href = "login.html";
}

// fungsi login utama
function doLogin(){

  const nama = document.getElementById("nama").value.trim();
  const kelas = document.getElementById("kelas").value.trim();

  if(!nama || !kelas){
    alert("Nama dan mapel wajib diisi");
    return;
  }

  const user = {
    id: Date.now(),
    nama: nama,
    kelas: kelas,
    loginAt: Date.now()
  };

  saveUser(user);

  // pindah ke dashboard
  window.location.href = "dashboard.html";
}

// pasang event tombol
document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("loginBtn");
  if(btn){
    btn.addEventListener("click", doLogin);
  }

  // auto redirect jika sudah login
  if(isLoggedIn()){
    window.location.href = "dashboard.html";
  }

});
