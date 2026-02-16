const soal = [
  {
    q: "Contoh soal 1?",
    o: ["A", "B", "C", "D"]
  },
  {
    q: "Contoh soal 2?",
    o: ["A", "B", "C", "D"]
  }
];

let current = 0;
let jawaban = {};

function tampilSoal(){
  document.getElementById("no").innerText = current + 1;
  document.getElementById("question").innerText = soal[current].q;

  const opsi = document.getElementById("options");
  opsi.innerHTML = "";

  soal[current].o.forEach((pil,i)=>{
    const btn = document.createElement("button");
    btn.innerText = pil;
    if(jawaban[current] === i) btn.classList.add("active");

    btn.onclick = () => {
      jawaban[current] = i;
      tampilSoal();
      renderGrid();
    }

    opsi.appendChild(btn);
  });
}

function nextSoal(){
  if(current < soal.length-1){
    current++;
    tampilSoal();
  }
}

function prevSoal(){
  if(current > 0){
    current--;
    tampilSoal();
  }
}

function renderGrid(){
  const grid = document.getElementById("numberGrid");
  grid.innerHTML = "";

  soal.forEach((_,i)=>{
    const box = document.createElement("div");
    box.innerText = i+1;
    if(jawaban[i] !== undefined) box.classList.add("done");
    box.onclick = ()=>{ current=i; tampilSoal(); }
    grid.appendChild(box);
  });
}

tampilSoal();
renderGrid();


// TIMER 120 menit
let waktu = 120*60;
setInterval(()=>{
  waktu--;
  let m = Math.floor(waktu/60);
  let s = waktu%60;
  document.getElementById("timer").innerText =
    `${m}:${s<10?"0":""}${s}`;
},1000);
