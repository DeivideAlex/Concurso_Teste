// Tela de Login e Interface Principal
function createLoginPage() {
  document.body.innerHTML = `
      <div id="login-container" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #f9f9f9;">
        <h1>Concurso Bíblico</h1>
        <form id="login-form" style="display: flex; flex-direction: column; width: 300px;">
          <input type="text" id="username" placeholder="Usuário" style="margin: 10px 0; padding: 10px; font-size: 16px;">
          <input type="password" id="password" placeholder="Senha" style="margin: 10px 0; padding: 10px; font-size: 16px;">
          <button type="button" id="login-btn" style="padding: 10px; background-color: #4CAF50; color: white; border: none; cursor: pointer;">Entrar</button>
          <button type="button" id="register-btn" style="padding: 10px; background-color: #2196F3; color: white; border: none; cursor: pointer; margin-top: 10px;">Registrar</button>
        </form>
      </div>
    `;

  document.getElementById("login-btn").addEventListener("click", handleLogin);
  document
    .getElementById("register-btn")
    .addEventListener("click", handleRegister);
}

function handleLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  // Simular autenticação
  if (username && password) {
    loadMainInterface();
  } else {
    alert("Por favor, preencha todos os campos.");
  }
}

function handleRegister() {
  alert("Funcionalidade de registro em construção.");
}

// Interface Principal Pós-Login
function loadMainInterface() {
  document.body.innerHTML = `
      <div id="main-container" style="display: flex; flex-direction: column; height: 100vh;">
        <header style="background-color: #4CAF50; color: white; padding: 10px; text-align: center; font-size: 24px;">Concurso Bíblico</header>
        <nav style="display: flex; justify-content: center; background-color: #f1f1f1; padding: 10px;">
          <button class="tab-btn" onclick="showTab('concurso')" style="margin: 0 10px; padding: 10px;">Concurso</button>
          <button class="tab-btn" onclick="showTab('classificacao')" style="margin: 0 10px; padding: 10px;">Classificação</button>
        </nav>
        <div id="content-area" style="flex: 1; padding: 20px; background-color: #ffffff; overflow-y: auto;">
          <div id="concurso-tab" class="tab-content">Bem-vindo ao Concurso Bíblico!</div>
          <div id="classificacao-tab" class="tab-content" style="display: none;">
            <h2>Classificação</h2>
            <table border="1" style="width: 100%; text-align: center;">
              <thead>
                <tr>
                  <th>Equipe</th>
                  <th>Vitórias</th>
                  <th>Empates</th>
                  <th>Derrotas</th>
                  <th>Perguntas Acertadas</th>
                  <th>Atividades</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Equipe A</td>
                  <td>3</td>
                  <td>1</td>
                  <td>0</td>
                  <td>25</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Equipe B</td>
                  <td>2</td>
                  <td>1</td>
                  <td>1</td>
                  <td>20</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

  showTab("concurso");
}

function showTab(tabId) {
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.style.display = "none";
  });
  document.getElementById(`${tabId}-tab`).style.display = "block";
}

// Inicializa a página
createLoginPage();
