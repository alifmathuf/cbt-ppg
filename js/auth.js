function login(){
  const nama = document.getElementById("nama").value.trim();
  const kelas = document.getElementById("kelas").value.trim();

  if(!nama || !kelas){
    alert("Nama dan mapel wajib diisi");
    return;
  }

  const user = {
    nama,
    kelas
  };

  localStorage.setItem("cbtUser", JSON.stringify(user));

  window.location.href = "dashboard.html";
}
