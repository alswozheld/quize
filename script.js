
let words = {};
let quiz = [];
let current = 0;
let score = 0;
let correctAnswer = "";

function startQuiz() {
  const level = document.getElementById("level").value;
  fetch(`wordlist_${level}.json`)
    .then(res => res.json())
    .then(data => {
      words = data;
      quiz = Object.entries(words);
      quiz = shuffle(quiz).slice(0, 5);
      current = 0;
      score = 0;
      document.getElementById("menu").classList.add("hidden");
      document.getElementById("result").classList.add("hidden");
      document.getElementById("quiz").classList.remove("hidden");
      showQuestion();
    });
}

function showQuestion() {
  const [word, meaning] = quiz[current];
  correctAnswer = meaning;
  document.getElementById("question").innerText = `Q${current + 1}: ${word}`;
  let choices = [meaning];
  while (choices.length < 4) {
    const randomMeaning = randomValue(Object.values(words));
    if (!choices.includes(randomMeaning)) choices.push(randomMeaning);
  }
  choices = shuffle(choices);
  const choiceDiv = document.getElementById("choices");
  choiceDiv.innerHTML = "";
  choices.forEach(c => {
    const btn = document.createElement("button");
    btn.innerText = c;
    btn.onclick = () => checkAnswer(c);
    choiceDiv.appendChild(btn);
  });
}

function checkAnswer(choice) {
  if (choice === correctAnswer) {
    alert("✅ 정답입니다!");
    score++;
  } else {
    alert(`❌ 오답입니다. 정답은: ${correctAnswer}`);
  }
  current++;
  if (current < quiz.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz").classList.add("hidden");
  const result = document.getElementById("result");
  result.innerText = `🎉 최종 점수: ${score} / ${quiz.length}`;
  result.classList.remove("hidden");
  document.getElementById("menu").classList.remove("hidden");
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
function randomValue(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
