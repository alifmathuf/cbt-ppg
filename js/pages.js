function mulaiUjian(){

  const tipe = document.getElementById("tipe").value;

  if(tipe === "pg"){
    window.location.href = "pg.html";
  } else {
    window.location.href = "studi-kasus.html";
  }

}
