/* =========================
   DASHBOARD DATA CONTROLLER
========================= */

document.addEventListener("DOMContentLoaded", () => {

  // contoh data (nanti bisa dari Firebase / API)
  const dashboardData = {
    ujianSelesai: 12,
    rataNilai: 82,
    peringkat: 5,
    akurasi: 87,
    aktivitas: [
      { mapel: "PAI Paket 1", nilai: 90 },
      { mapel: "Fiqih Paket 2", nilai: 85 },
      { mapel: "Aqidah Paket 3", nilai: 88 }
    ]
  };

  // update statistik
  const values = document.querySelectorAll(".stat-value");

  if(values.length >= 4){
    values[0].textContent = dashboardData.ujianSelesai;
    values[1].textContent = dashboardData.rataNilai;
    values[2].textContent = "#" + dashboardData.peringkat;
    values[3].textContent = dashboardData.akurasi + "%";
  }

  // update aktivitas terbaru
  const activityBox = document.querySelector(".activity-box");

  if(activityBox){
    const items = activityBox.querySelectorAll(".activity-item");

    dashboardData.aktivitas.forEach((item, i) => {
      if(items[i]){
        items[i].children[0].textContent = item.mapel;
        items[i].children[1].textContent = item.nilai;
      }
    });
  }

});
