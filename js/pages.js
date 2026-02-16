/* ===============================
   PAGES SCRIPT
   riwayat • leaderboard • statistik • result
================================ */


/* ========= LOAD HISTORY ========= */

function loadHistory() {
  const container = document.getElementById("historyList");
  if (!container) return;

  const history = JSON.parse(localStorage.getItem("examHistory")) || [];

  if (!history.length) {
    container.innerHTML = "<p>Belum ada riwayat.</p>";
    return;
  }

  container.innerHTML = history
    .slice()
    .reverse()
    .map(item => `
      <div class="history-item">
        <div>
          <strong>${formatDate(item.date)}</strong>
          <div class="history-meta">Percobaan</div>
        </div>
        <div class="history-score">${item.score}</div>
      </div>
    `).join("");
}


/* ========= LOAD LEADERBOARD ========= */

function loadLeaderboard() {
  const table = document.getElementById("leaderboardBody");
  if (!table) return;

  const history = JSON.parse(localStorage.getItem("examHistory")) || [];

  if (!history.length) {
    table.innerHTML = "<tr><td colspan='3'>Belum ada data</td></tr>";
    return;
  }

  const sorted = [...history].sort((a,b)=>b.score - a.score).slice(0,10);

  table.innerHTML = sorted.map((item, i) => `
    <tr>
      <td class="rank-medal">${i+1}</td>
      <td>${item.name || "Peserta"}</td>
      <td>${item.score}</td>
    </tr>
  `).join("");
}


/* ========= LOAD RESULT ========= */

function loadResult() {
  const scoreEl = document.getElementById("finalScore");
  if (!scoreEl) return;

  const history = JSON.parse(localStorage.getItem("examHistory")) || [];
  if (!history.length) return;

  const last = history[history.length - 1];

  scoreEl.textContent = last.score;

  const statusBox = document.getElementById("statusBox");
  if (statusBox) {
    if (last.score >= 75) {
      statusBox.textContent = "LULUS";
      statusBox.className = "status-pass";
    } else {
      statusBox.textContent = "BELUM LULUS";
      statusBox.className = "status-fail";
    }
  }
}


/* ========= LOAD STATISTICS ========= */

function loadStatistics() {
  const totalEl = document.getElementById("statTotal");
  if (!totalEl) return;

  const history = JSON.parse(localStorage.getItem("examHistory")) || [];

  const total = history.length;
  const avg = total
    ? Math.round(history.reduce((a,b)=>a+b.score,0) / total)
    : 0;
  const best = total ? Math.max(...history.map(h=>h.score)) : 0;

  document.getElementById("statTotal").textContent = total;
  document.getElementById("statAverage").textContent = avg;
  document.getElementById("statBest").textContent = best;
}


/* ========= SAVE RESULT ========= */

function saveResult(score, name="Peserta") {
  const history = JSON.parse(localStorage.getItem("examHistory")) || [];

  history.push({
    name: name,
    score: score,
    date: new Date().toISOString()
  });

  localStorage.setItem("examHistory", JSON.stringify(history));
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


/* ========= INIT ========= */

document.addEventListener("DOMContentLoaded", () => {
  loadHistory();
  loadLeaderboard();
  loadResult();
  loadStatistics();
});
