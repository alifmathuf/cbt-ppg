/* ========= AUTH SYSTEM ========= */

// generate ID sederhana
function generateUserId() {
  return "U" + Math.random().toString(36).substring(2, 9);
}

// login dari form
function login() {
  const nama = document.getElementById("nama").value.trim();
  const kelas = document.getElementById("kelas").value.trim();

  if (!nama || !kelas) {
    alert("Isi nama dan mapel");
    return;
  }

  const user = {
    id: generateUserId(),
    name: nama,
    kelas: kelas
  };

  localStorage.setItem("user", JSON.stringify(user));

  window.location.href = "dashboard.html";
}

// auto redirect jika sudah login
function autoRedirect() {
  const user = localStorage.getItem("user");
  if (user) {
    window.location.href = "dashboard.html";
  }
}
