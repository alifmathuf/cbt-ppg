/* =================================
   DASHBOARD SCRIPT
   khusus halaman dashboard
================================= */


/* ========= ELEMENT ========= */

const nameEl = document.getElementById("userName");
const avatarEl = document.getElementById("userAvatar");

const totalTryEl = document.getElementById("totalTry");
const avgScoreEl = document.getElementById("avgScore");
const bestScoreEl = document.getElementById("bestScore");


/* ========= LOAD USER ========= */

function loadUserInfo() {
  const user = getUser();
  if (!user) return;

  if (nameEl) nameEl.textContent = user.name;
  if (avatarEl) avatarEl.src = generateAvatar(user.name);
}


/* ========= LOAD STATISTICS ========= */

function loadStats() {
  const history = JSON.parse(localStorage.getItem("examHistory")) || [];

  if (!history.length) {
    if (totalTryEl) totalTryEl.textContent = 0;
    if (avgScoreEl) avgScoreEl.textContent = 0;
    if (bestScoreEl) bestScoreEl.textContent = 0;
    return;
  }

  const total = history.length;
  const scores = history.map(h => h.score || 0);
  const avg = Math.round(scores.reduce((a,b)=>a+b,0) / total);
  const best = Math.max(...scores);

  if (totalTryEl) totalTryEl.textContent = total;
  if (avgScoreEl) avgScoreEl.textContent = avg;
  if (bestScoreEl) bestScoreEl.textContent = best;
}


/* ========= LOAD RECENT RESULT ========= */

function loadLastResult() {
  const history = JSON.parse(localStorage.getItem("examHistory")) || [];
  if (!history.length) return;

  const last = history[history.length - 1];

  const lastScore = document.getElementById("lastScore");
  const lastDate = document.getElementById("lastDate");

  if (lastScore) lastScore.textContent = last.score;
  if (lastDate) lastDate.textContent = formatDate(last.date);
}


/* ========= DATE FORMAT ========= */

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}


/* ========= CHART ========= */

function loadChart() {
  const canvas = document.getElementById("scoreChart");
  if (!canvas) return;

  const history = JSON.parse(localStorage.getItem("examHistory")) || [];
  if (!history.length) return;

  const labels = history.map((_, i) => i + 1);
  const data = history.map(h => h.score);

  new Chart(canvas, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Skor",
        data: data,
        tension: 0.3,
        fill: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true, max: 100 }
      }
    }
  });
}


/* ========= INIT ========= */

document.addEventListener("DOMContentLoaded", () => {
  loadUserInfo();
  loadStats();
  loadLastResult();
  loadChart();
});
