const questions = [
  {
    question: "Quem criou os céus e a terra?",
    options: ["Adão", "Noé", "Deus", "Abraão"],
    answer: 2,
  },
  {
    question: "Quantos dias Deus levou para criar o mundo?",
    options: ["6", "7", "8", "5"],
    answer: 0,
  },
  // Adicione mais perguntas conforme necessário
];

let currentQuestion = 0;
let currentTeam = "A"; // Equipe inicial
let scores = { A: 0, B: 0 };
let correctAnswers = { A: 0, B: 0 }; // Contador de acertos
let attempt = 0;

function toggleMusic() {
  const music = document.getElementById("backgroundMusic");
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}
function validateLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "1234") {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("start-screen").style.display = "block";
    document.getElementById("team-selection").style.display = "block";
    document.getElementById("teamA-photo").style.display = "block";
    document.getElementById("teamB-photo").style.display = "block";
  } else {
    alert("Usuário ou senha incorretos! Tente novamente.");
  }
}

function registerUser() {
  const username = prompt("Digite o nome de usuário:");
  const password = prompt("Digite a senha:");

  if (username && password) {
    // Recuperar usuários já cadastrados do localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Verificar se o usuário já existe
    if (users.find((u) => u.username === username)) {
      alert("Usuário já cadastrado! Escolha outro nome de usuário.");
      return;
    }

    // Adicionar novo usuário ao armazenamento
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Usuário cadastrado com sucesso!");
  } else {
    alert("Cadastro cancelado. Nome de usuário e senha são obrigatórios.");
  }
}

// Função para validar o login
function validateLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Recuperar usuários cadastrados do localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Verificar se o usuário e a senha estão corretos
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("start-screen").style.display = "block";
    document.getElementById("team-selection").style.display = "block";
    document.getElementById("teamA-photo").style.display = "block";
    document.getElementById("teamB-photo").style.display = "block";
    alert(`Bem-vindo, ${username}!`);
  } else {
    alert("Usuário ou senha incorretos! Tente novamente.");
  }
}
function redirectTo(page) {
  window.location.href = page;
}
function startGame() {
  const teamA = document.getElementById("teamA-select").value;
  const teamB = document.getElementById("teamB-select").value;

  if (!teamA || !teamB) {
    alert("Por favor, selecione as equipes antes de iniciar o jogo.");
    return;
  }

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("team-scores").style.display = "block";
  document.getElementById("quiz").style.display = "block";
  loadQuestion();
  const music = document.getElementById("backgroundMusic");
  music.play();
}

function updateTeam(team) {
  const selectElement = document.getElementById(`team${team}-select`);
  const teamName = selectElement.options[selectElement.selectedIndex].text;
  const teamPhoto = selectElement.value;

  document.getElementById(`team${team}-name`).textContent = teamName;
  document.querySelector(`#team${team}-photo img`).src = teamPhoto;
}

function loadQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const question = questions[currentQuestion];

  questionElement.textContent = question.question;
  optionsElement.innerHTML = "";

  question.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<input type="radio" name="option" value="${index}" id="option${index}"> <label for="option${index}">${option}</label>`;
    optionsElement.appendChild(li);
  });
}

function nextQuestion() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (!selectedOption) {
    alert("Por favor, selecione uma resposta!");
    return;
  }

  const answer = parseInt(selectedOption.value);
  if (answer === questions[currentQuestion].answer) {
    const points = attempt === 0 ? 10 : attempt === 1 ? 6 : 3;
    scores[currentTeam] += points;
    correctAnswers[currentTeam] += 1; // Incrementa os acertos da equipe atual
    updateScores();
    nextTurn();
  } else {
    attempt++;
    if (attempt > 2) {
      nextTurn();
    } else {
      currentTeam = currentTeam === "A" ? "B" : "A";
      alert(`Agora é a vez da Equipe ${currentTeam}`);
    }
  }
}

function nextTurn() {
  attempt = 0; // Resetar tentativas para a próxima pergunta

  // Alternar o time com base na ordem da pergunta (alternando entre A e B)
  if (currentQuestion % 2 === 0) {
    currentTeam = "B";
  } else {
    currentTeam = "A";
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function updateScores() {
  document.getElementById(
    "scoreA"
  ).textContent = `Pontos: ${scores.A} | Acertos: ${correctAnswers.A}`;
  document.getElementById(
    "scoreB"
  ).textContent = `Pontos: ${scores.B} | Acertos: ${correctAnswers.B}`;
}

function showResult() {
  const quizElement = document.getElementById("quiz");
  const resultElement = document.getElementById("result");
  const questionSelector = document.getElementById("question-selector");

  quizElement.style.display = "none";
  resultElement.style.display = "block";
  questionSelector.style.display = "block";

  const winner =
    scores.A > scores.B
      ? "Equipe A"
      : scores.B > scores.A
      ? "Equipe B"
      : "Empate";
  resultElement.textContent = `Placar final - Equipe A: ${scores.A} (Acertos: ${correctAnswers.A}), Equipe B: ${scores.B} (Acertos: ${correctAnswers.B}). Vencedor: ${winner}`;

  const questionList = document.getElementById("question-list");
  questionList.innerHTML = "";
  questions.forEach((q, index) => {
    const li = document.createElement("li");
    li.textContent = `Pergunta ${index + 1}: ${q.question}`;
    questionList.appendChild(li);
  });
}
function captureAndDownloadScreenshot() {
  const element = document.querySelector(".quiz-container"); // Captura o elemento da tela com a classe 'quiz-container'

  // Oculta temporariamente imagens
  const images = element.querySelectorAll("img");
  images.forEach((img) => {
    img.style.display = "none";
  });

  html2canvas(element, {
    scrollX: 0,
    scrollY: 0,
    width: element.scrollWidth,
    height: element.scrollHeight,
    x: window.scrollX,
    y: window.scrollY,
    useCORS: true,
  })
    .then((canvas) => {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "quiz-container-screenshot.png"; // Nome do arquivo
      link.click(); // Faz o download da imagem

      // Restaura as imagens
      images.forEach((img) => {
        img.style.display = "";
      });
    })
    .catch((error) => {
      console.error("Erro ao capturar a tela:", error);
    });
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((reg) => console.log("Service Worker registrado:", reg))
    .catch((err) => console.error("Erro ao registrar o Service Worker:", err));
}
