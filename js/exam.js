/* =================================
   EXAM SCRIPT
   PG + STUDI KASUS
================================ */


/* ========= GLOBAL ========= */

let questions = [];
let currentIndex = 0;
let answers = {};
let timerInterval;
let timeLeft = 0;


/* ========= LOAD QUESTIONS ========= */

async function loadQuestions(url) {
  try {
    const res = await fetch(url);
    questions = await res.json();

    if (!questions.length) return;

    initExam();
  } catch (err) {
    console.error("Gagal load soal:", err);
  }
}


/* ========= INIT ========= */

function initExam() {
  renderQuestion();
  renderNumberNav();
  startTimer(questions.length * 60); // 1 menit per soal
}


/* ========= RENDER QUESTION ========= */

function renderQuestion() {
  const box = document.getElementById("questionBox");
  if (!box) return;

  const q = questions[currentIndex];

  box.innerHTML = `
    <h3>Soal ${currentIndex + 1}</h3>
    <p>${q.q}</p>
    ${q.options.map((opt, i) => `
      <label>
        <input type="radio" name="answer" value="${i}"
          ${answers[currentIndex]==i ? "checked" : ""}>
        ${opt}
      </label>
    `).join("")}
  `;

  updateProgress();
}


/* ========= NUMBER NAV ========= */

function renderNumberNav() {
  const nav = document.getElementById("numberNav");
  if (!nav) return;

  nav.innerHTML = questions.map((_, i) => `
    <button class="
      ${i === currentIndex ? "active" : ""}
      ${answers[i] !== undefined ? "answered" : ""}
    " onclick="goToQuestion(${i})">${i+1}</button>
  `).join("");
}

function goToQuestion(i) {
  saveAnswer();
  currentIndex = i;
  renderQuestion();
  renderNumberNav();
}


/* ========= SAVE ANSWER ========= */

function saveAnswer() {
  const checked = document.querySelector('input[name="answer"]:checked');
  if (checked) answers[currentIndex] = Number(checked.value);
}


/* ========= NAVIGATION ========= */

function nextQuestion() {
  saveAnswer();
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
    renderNumberNav();
  }
}

function prevQuestion() {
  saveAnswer();
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
    renderNumberNav();
  }
}


/* ========= PROGRESS ========= */

function updateProgress() {
  const fill = document.getElementById("progressFill");
  if (!fill) return;

  const percent = ((currentIndex + 1) / questions.length) * 100;
  fill.style.width = percent + "%";
}


/* ========= TIMER ========= */

function startTimer(seconds) {
  const timerEl = document.getElementById("timer");
  if (!timerEl) return;

  timeLeft = seconds;

  timerInterval = setInterval(() => {
    timeLeft--;

    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;

    timerEl.textContent =
      `${min}:${sec.toString().padStart(2,"0")}`;

    if (timeLeft <= 60) timerEl.classList.add("warning");
    if (timeLeft <= 20) timerEl.classList.add("danger");

    if (timeLeft <= 0) finishExam();
  }, 1000);
}


/* ========= FINISH ========= */

function finishExam() {
  clearInterval(timerInterval);
  saveAnswer();

  let score = 0;

  questions.forEach((q, i) => {
    if (answers[i] == q.answer) score++;
  });

  score = Math.round((score / questions.length) * 100);

  saveResult(score); // dari pages.js

  window.location.href = "result.html";
}


/* ========= ESSAY / STUDI KASUS ========= */

function initEssay(limit = 150) {
  const box = document.getElementById("essayBox");
  const counter = document.getElementById("wordCounter");

  if (!box || !counter) return;

  box.addEventListener("input", () => {
    const words = box.value.trim().split(/\s+/).filter(Boolean);
    counter.textContent = words.length + " kata";

    if (words.length > limit) {
      counter.style.color = "var(--danger)";
    } else {
      counter.style.color = "";
    }
  });
}


/* ========= AUTO INIT ========= */

document.addEventListener("DOMContentLoaded", () => {

  if (document.getElementById("questionBox")) {
    loadQuestions("questions.json");
  }

  if (document.getElementById("essayBox")) {
    initEssay();
  }

});
