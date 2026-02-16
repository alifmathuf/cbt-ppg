function login(){
  const nama = document.getElementById("nama").value.trim();
  const kelas = document.getElementById("kelas").value.trim();

  if(!nama || !kelas){
    alert("Nama dan mapel wajib diisi");
    return;
  }

  Auth.login(nama, kelas);
  window.location.href = "dashboard.html";
}

// ⬇⬇ TAMBAHKAN INI
window.login = login;
