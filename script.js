// ── localStorage helpers ───────────────────────────────────────────────────
function loadStorage() {
  try { return JSON.parse(localStorage.getItem('jogoLogica_v1')) || {}; }
  catch (e) { return {}; }
}
function saveStorage(data) {
  localStorage.setItem('jogoLogica_v1', JSON.stringify(data));
}
function getCaseData(n) {
  const d = loadStorage()[n];
  return d || { notes: '', hypothesis: '', guessHistory: [], cluesRevealed: 0, completed: false };
}
function setCaseData(n, partial) {
  const data = loadStorage();
  data[n] = Object.assign(getCaseData(n), partial);
  saveStorage(data);
}

// ── Cases ──────────────────────────────────────────────────────────────────
const cases = {
  1: {
    answer: 'Carlos',
    introScreen: 'screen-intro-1',
    logicScreen: 'screen-logic-1',
    propositions: [
      { letter: 'P', meaning: 'Ana estava na sala de cibersegurança' },
      { letter: 'Q', meaning: 'Bruno estava na sala de cibersegurança' },
      { letter: 'R', meaning: 'Carlos estava na sala de cibersegurança' },
      { letter: 'S', meaning: 'Diana estava na sala de cibersegurança' },
      { letter: 'T', meaning: 'Eduardo estava na sala de cibersegurança' },
      { letter: 'U', meaning: 'Fernanda estava na sala de cibersegurança' },
      { letter: 'V', meaning: 'Gabriel estava na sala de cibersegurança' },
      { letter: 'W', meaning: 'Helena estava na sala de cibersegurança' },
    ],
    suspects: [
      { id: 's1-ana',      icon: '👩‍🎓', name: 'Ana',      role: 'Aluna' },
      { id: 's1-bruno',    icon: '🧑‍💻', name: 'Bruno',    role: 'Monitor' },
      { id: 's1-carlos',   icon: '🧑‍🔧', name: 'Carlos',   role: 'Técnico de TI' },
      { id: 's1-diana',    icon: '👩‍🏫', name: 'Diana',    role: 'Professora' },
      { id: 's1-eduardo',  icon: '👨‍🏫', name: 'Eduardo',  role: 'Professor' },
      { id: 's1-fernanda', icon: '👩‍💼', name: 'Fernanda', role: 'Coordenadora' },
      { id: 's1-gabriel',  icon: '💂',  name: 'Gabriel',  role: 'Segurança' },
      { id: 's1-helena',   icon: '👩‍📚', name: 'Helena',   role: 'Recepcionista' },
    ],
    clues: [
      { text: '"Se Ana estava na sala de cibersegurança, então Bruno, o monitor, também estava."', logic: 'P → Q', rule: 'Proposição condicional' },
      { text: '"Bruno saiu mais cedo e não estava na sala de cibersegurança naquela noite."', logic: '¬Q', rule: 'Negação simples' },
      { text: '"Se Diana estava na sala de cibersegurança, então Ana também estava — ela nunca ficava sozinha."', logic: 'S → P', rule: 'Proposição condicional' },
      { text: '"Fernanda, a coordenadora, só ficava após o horário se Diana também ficasse."', logic: 'U → S', rule: 'Proposição condicional' },
      { text: '"Uma testemunha viu ou Eduardo ou Ana no corredor da sala de cibersegurança — um dos dois estava lá."', logic: 'T ∨ P', rule: 'Proposição disjuntiva' },
      { text: '"Se Eduardo estava no Brum, ele sempre passava pela sala de cibersegurança para checar os equipamentos."', logic: 'T → R', rule: 'Proposição condicional' },
      { text: '"Eduardo tem álibi confirmado: estava em reunião gravada com a direção e não poderia ter agido."', logic: '¬culpado(T)', rule: 'Negação — eliminação direta' },
      { text: '"A câmera do corredor registrou: Helena ou Gabriel estava na sala de cibersegurança naquela noite."', logic: 'W ∨ V', rule: 'Proposição disjuntiva' },
      { text: '"Se Helena estava na sala de cibersegurança, Bruno obrigatoriamente também estaria — ela nunca entrava sem o monitor."', logic: 'W → Q', rule: 'Proposição condicional' },
      { text: '"Gabriel estava de plantão como segurança — seu registro de ronda exclui qualquer envolvimento no furto."', logic: '¬culpado(V)', rule: 'Negação — eliminação direta' },
      { text: '"O notebook só poderia ter sido roubado por quem estava na sala de cibersegurança naquela noite."', logic: 'R → culpado(R)', rule: 'Regra do caso' }
    ],
    eliminatedOnFinish: ['s1-ana','s1-bruno','s1-diana','s1-fernanda','s1-eduardo','s1-helena','s1-gabriel'],
    successText: `Excelente dedução! <strong style="color:var(--green2)">Carlos, o técnico de TI</strong>, roubou o notebook da Cesar School.<br><br>
      <em>Modus Tollens</em> (P→Q, ¬Q) → Ana eliminada.<br>
      <em>Modus Tollens</em> (S→P, ¬P) → Diana eliminada.<br>
      <em>Modus Tollens</em> (U→S, ¬S) → Fernanda eliminada.<br>
      <em>Silogismo Disjuntivo</em> (T∨P, ¬P) → Eduardo presente.<br>
      <em>Modus Ponens</em> (T→R, T) → Carlos presente.<br>
      <em>Negação direta</em> → Eduardo eliminado.<br>
      <em>Modus Tollens</em> (W→Q, ¬Q) → Helena eliminada.<br>
      <em>Silogismo Disjuntivo</em> (W∨V, ¬W) → Gabriel presente.<br>
      <em>Negação direta</em> → Gabriel eliminado.<br>
      <em>Modus Ponens</em> (R→culpado, R) → Carlos é o culpado.`,
    failureText: `Suas tentativas se esgotaram. O culpado era <strong style="color:#e07070">Carlos, o técnico de TI</strong>.<br><br>Revise a tabela de inferências para entender o raciocínio completo.`
  },

  2: {
    answer: 'Lívia',
    introScreen: 'screen-intro-2',
    logicScreen: 'screen-logic-2',
    propositions: [
      { letter: 'A', meaning: 'Marcos estava na sala de estudos' },
      { letter: 'B', meaning: 'Lívia estava na sala de estudos' },
      { letter: 'C', meaning: 'Roberto estava na sala de estudos' },
      { letter: 'D', meaning: 'Patrícia estava na sala de estudos' },
      { letter: 'E', meaning: 'Caio estava na sala de estudos' },
      { letter: 'F', meaning: 'Sônia estava na sala de estudos' },
    ],
    suspects: [
      { id: 's2-marcos',   icon: '🧑‍🎓', name: 'Marcos',   role: 'Aluno Veterano' },
      { id: 's2-livia',    icon: '👩‍💻', name: 'Lívia',    role: 'Monitora' },
      { id: 's2-roberto',  icon: '🧹',  name: 'Roberto',  role: 'Zelador' },
      { id: 's2-patricia', icon: '👩‍🏫', name: 'Patrícia', role: 'Prof. de Filosofia' },
      { id: 's2-caio',     icon: '🎬',  name: 'Caio',     role: 'Técnico AV' },
      { id: 's2-sonia',    icon: '📚',  name: 'Sônia',    role: 'Bibliotecária' },
    ],
    clues: [
      { text: '"Se Marcos estava na sala de estudos, então Sônia, a bibliotecária, também estava — ela sempre o acompanhava nos turnos noturnos."', logic: 'A → F', rule: 'Proposição condicional' },
      { text: '"O registro de ponto de Sônia é claro: ela encerrou seu turno às 21h30 e não retornou ao Brum naquela noite."', logic: '¬F', rule: 'Negação simples' },
      { text: '"Caio, o técnico de audiovisual, só montava equipamentos na sala de estudos quando Marcos estava presente para supervisionar."', logic: 'E → A', rule: 'Proposição condicional' },
      { text: '"Patrícia só permanecia no campus após as 22h quando Marcos também estava — ela aguardava orientação de alunos sob supervisão."', logic: 'D → A', rule: 'Proposição condicional' },
      { text: '"A câmera do corredor captou uma sombra entrando na sala de estudos. Os investigadores concluíram: era Roberto ou Lívia."', logic: 'C ∨ B', rule: 'Proposição disjuntiva' },
      { text: '"Roberto, o zelador, tinha uma regra de segurança: nunca ficava no terceiro andar sem Sônia — ela era a responsável pelas chaves do andar."', logic: 'C → F', rule: 'Proposição condicional' },
      { text: '"O laudo pericial é conclusivo: o crime só poderia ter sido cometido por alguém que estava fisicamente na sala de estudos naquela noite."', logic: 'B → culpado(B)', rule: 'Regra do caso' }
    ],
    eliminatedOnFinish: ['s2-marcos','s2-roberto','s2-patricia','s2-caio','s2-sonia'],
    successText: `Dedução impecável! <strong style="color:var(--green2)">Lívia, a monitora</strong>, assassinou Thiago na sala de estudos.<br><br>
      <em>Modus Tollens</em> (A→F, ¬F) → Marcos eliminado.<br>
      <em>Modus Tollens</em> (E→A, ¬A) → Caio eliminado.<br>
      <em>Modus Tollens</em> (D→A, ¬A) → Patrícia eliminada.<br>
      <em>Modus Tollens</em> (C→F, ¬F) → Roberto eliminado.<br>
      <em>Silogismo Disjuntivo</em> (C∨B, ¬C) → Lívia estava na sala.<br>
      <em>Modus Ponens</em> (B→culpado, B) → Lívia é a culpada.`,
    failureText: `Suas tentativas se esgotaram. A culpada era <strong style="color:#e07070">Lívia, a monitora</strong>.<br><br>Revise a tabela de inferências para entender o raciocínio completo.`
  },

  3: {
    answer: 'Renata',
    introScreen: 'screen-intro-3',
    logicScreen: 'screen-logic-3',
    propositions: [
      { letter: 'P', meaning: 'Igor estava no corredor da coordenação' },
      { letter: 'Q', meaning: 'Valdete estava no corredor da coordenação' },
      { letter: 'R', meaning: 'Renata estava no corredor da coordenação' },
      { letter: 'S', meaning: 'Tiago estava no corredor da coordenação' },
      { letter: 'T', meaning: 'Cíntia estava no corredor da coordenação' },
    ],
    suspects: [
      { id: 's3-renata',  icon: '👩‍💼', name: 'Renata',  role: 'Secretária Pedagógica' },
      { id: 's3-igor',    icon: '🧑‍🎓', name: 'Igor',    role: 'Aluno Repetente' },
      { id: 's3-valdete', icon: '🧹',  name: 'Valdete', role: 'Zeladora Noturna' },
      { id: 's3-tiago',   icon: '🔧',  name: 'Tiago',   role: 'Técnico de Manutenção' },
      { id: 's3-cintia',  icon: '👩‍🏫', name: 'Cíntia',  role: 'Coordenadora Adj.' },
    ],
    clues: [
      { text: '"Se Igor estava no corredor da coordenação, então Valdete, a zeladora noturna, também estava — ela nunca deixava alunos circularem sozinhos após meia-noite."', logic: 'P → Q', rule: 'Proposição condicional' },
      { text: '"O cartão de ponto de Valdete registra saída às 23h45. Ela não estava no corredor da coordenação naquela madrugada."', logic: '¬Q', rule: 'Negação simples' },
      { text: '"Tiago, o técnico de manutenção, só entrava na ala da coordenação quando Igor estava presente — protocolo de segurança para trabalhos noturnos."', logic: 'S → P', rule: 'Proposição condicional' },
      { text: '"Cíntia, a coordenadora adjunta, só permanecia além da meia-noite quando Tiago estava realizando manutenção emergencial no setor."', logic: 'T → S', rule: 'Proposição condicional' },
      { text: '"O log do sistema de acesso é claro: ou Renata ou Cíntia utilizou a senha mestra para abrir o corredor da coordenação naquela madrugada."', logic: 'R ∨ T', rule: 'Proposição disjuntiva' },
      { text: '"O perito constatou: a prova só poderia ter sido retirada por quem tinha acesso ao sistema de arquivos pedagógico — e apenas Renata possuía essa senha naquela semana."', logic: 'R → culpado(R)', rule: 'Regra do caso' }
    ],
    eliminatedOnFinish: ['s3-igor', 's3-valdete', 's3-tiago', 's3-cintia'],
    successText: `Raciocínio preciso! <strong style="color:var(--green2)">Renata, a secretária pedagógica</strong>, furtou a prova final de POO.<br><br>
      <em>Modus Tollens</em> (P→Q, ¬Q) → Igor eliminado.<br>
      <em>Modus Tollens</em> (S→P, ¬P) → Tiago eliminado.<br>
      <em>Modus Tollens</em> (T→S, ¬S) → Cíntia eliminada.<br>
      <em>Silogismo Disjuntivo</em> (R∨T, ¬T) → Renata presente.<br>
      <em>Modus Ponens</em> (R→culpado, R) → Renata é a culpada.`,
    failureText: `Suas tentativas se esgotaram. A culpada era <strong style="color:#e07070">Renata, a secretária pedagógica</strong>.<br><br>Revise a tabela de inferências para entender o raciocínio completo.`
  },

  4: {
    answer: 'Fábio',
    introScreen: 'screen-intro-4',
    logicScreen: 'screen-logic-4',
    propositions: [
      { letter: 'A', meaning: 'Marina estava na sala do servidor' },
      { letter: 'B', meaning: 'Kelvin estava na sala do servidor' },
      { letter: 'C', meaning: 'Norma estava na sala do servidor' },
      { letter: 'D', meaning: 'Davi estava na sala do servidor' },
      { letter: 'E', meaning: 'Priscila estava na sala do servidor' },
      { letter: 'F', meaning: 'Fábio estava na sala do servidor' },
    ],
    suspects: [
      { id: 's4-fabio',    icon: '👨‍💻', name: 'Fábio',    role: 'Estagiário de TI' },
      { id: 's4-marina',   icon: '👩‍🔬', name: 'Marina',   role: 'Professora de Redes' },
      { id: 's4-kelvin',   icon: '🧑‍🎓', name: 'Kelvin',   role: 'Aluno Formando' },
      { id: 's4-norma',    icon: '👩‍💼', name: 'Norma',    role: 'Diretora Acadêmica' },
      { id: 's4-davi',     icon: '👷',  name: 'Davi',     role: 'Eletricista Contratado' },
      { id: 's4-priscila', icon: '📋',  name: 'Priscila', role: 'Assist. Administrativa' },
    ],
    clues: [
      { text: '"Se Marina estava na sala do servidor, então Kelvin também estava — ela nunca entrava em áreas restritas sem um aluno designado como acompanhante."', logic: 'A → B', rule: 'Proposição condicional' },
      { text: '"Kelvin estava no auditório realizando sua apresentação de portfólio naquele exato momento — há gravação ao vivo que confirma."', logic: '¬B', rule: 'Negação simples' },
      { text: '"Se Norma estava na sala do servidor, então Marina também estava — protocolo da direção exigia acompanhamento técnico em todas as visitas."', logic: 'C → A', rule: 'Proposição condicional' },
      { text: '"Davi, o eletricista contratado, só podia acessar a sala do servidor se Norma estivesse presente para autorizar a entrada — exigência contratual."', logic: 'D → C', rule: 'Proposição condicional' },
      { text: '"Priscila estava na sala do servidor exclusivamente para acompanhar o trabalho elétrico contratado — sem Davi, ela não teria motivo para estar lá."', logic: 'E → D', rule: 'Proposição condicional' },
      { text: '"O log de acesso por crachá registrou apenas duas entradas válidas naquela janela de tempo: ou Priscila ou Fábio entrou na sala do servidor."', logic: 'E ∨ F', rule: 'Proposição disjuntiva' },
      { text: '"Priscila tem álibi irrefutável: estava registrada na recepção do evento recebendo convidados durante todo o período em que o servidor foi derrubado."', logic: '¬E', rule: 'Negação — eliminação direta' },
      { text: '"O perito confirmou: a sabotagem foi cometida por quem estava fisicamente na sala do servidor e tinha conhecimento técnico para contornar o sistema de UPS."', logic: 'F → culpado(F)', rule: 'Regra do caso' }
    ],
    eliminatedOnFinish: ['s4-marina', 's4-kelvin', 's4-norma', 's4-davi', 's4-priscila'],
    successText: `Investigação brilhante! <strong style="color:var(--green2)">Fábio, o estagiário de TI</strong>, sabotou o servidor durante a noite de portfólios.<br><br>
      <em>Modus Tollens</em> (A→B, ¬B) → Marina eliminada.<br>
      <em>Modus Tollens</em> (C→A, ¬A) → Norma eliminada.<br>
      <em>Modus Tollens</em> (D→C, ¬C) → Davi eliminado.<br>
      <em>Modus Tollens</em> (E→D, ¬D) → Priscila eliminada.<br>
      <em>Silogismo Disjuntivo</em> (E∨F, ¬E) → Fábio presente.<br>
      <em>Modus Ponens</em> (F→culpado, F) → Fábio é o culpado.`,
    failureText: `Suas tentativas se esgotaram. O culpado era <strong style="color:#e07070">Fábio, o estagiário de TI</strong>.<br><br>Revise a tabela de inferências para entender o raciocínio completo.`
  }
};

// ── State ──────────────────────────────────────────────────────────────────
let currentCase = 1;
let currentClue = 0;
let tries = 3;
let notebookSaveTimer = null;
let autoRevealInterval = null;
let accusationTimer = null;
let timeLeft = 90;

// ── Navigation ─────────────────────────────────────────────────────────────
function selectCase(n) {
  currentCase = n;
  resetCaseState();
  renderCaseUI();
  restoreSessionState(n);
  populateNotebook(n);
  goTo(cases[n].introScreen);
  showNotebookToggle();
}

function goTo(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'screen-select') {
    hideNotebookToggle();
  } else {
    showNotebookToggle();
  }
  if (id === 'screen-answer') {
    startAccusationTimer();
  } else {
    stopAccusationTimer();
  }
}

function goToLogic() { goTo(cases[currentCase].logicScreen); }

function goToSelect() {
  resetCaseState();
  goTo('screen-select');
}

// ── Render ─────────────────────────────────────────────────────────────────
function renderCaseUI() {
  const c = cases[currentCase];

  const suspectsGrid = document.getElementById('suspects-grid-clues');
  suspectsGrid.innerHTML = c.suspects.map(s => `
    <div class="suspect-card" id="${s.id}">
      <span class="suspect-icon">${s.icon}</span>
      <span class="suspect-name">${s.name}</span>
      <span class="suspect-role">${s.role}</span>
    </div>
  `).join('');

  const guessSelect = document.getElementById('guess-select');
  if (guessSelect) {
    guessSelect.innerHTML = '<option value="">— Selecione o suspeito —</option>' +
      c.suspects.map(s => `<option value="${s.name}">${s.icon} ${s.name} — ${s.role}</option>`).join('');
  }

  document.querySelectorAll('.case-progress-badge').forEach(el => {
    el.textContent = `Caso ${currentCase} de 4`;
  });
}

// ── Clues ──────────────────────────────────────────────────────────────────
function revealNextClue(silent = false) {
  const clues = cases[currentCase].clues;
  if (currentClue >= clues.length) return;

  const clue = clues[currentClue];
  const list = document.getElementById('clue-list');
  const li = document.createElement('li');
  li.className = silent ? 'clue-item revealed no-anim' : 'clue-item revealed';
  li.innerHTML = `
    <div class="clue-text">${clue.text}</div>
    <div class="clue-logic">${clue.logic}</div>
    <div class="clue-rule">${clue.rule}</div>
  `;
  list.appendChild(li);
  if (!silent) list.scrollTop = list.scrollHeight;
  currentClue++;

  setCaseData(currentCase, { cluesRevealed: currentClue });

  if (currentClue >= clues.length) {
    clearInterval(autoRevealInterval);
    autoRevealInterval = null;
    document.getElementById('reveal-btn-area').style.display = 'none';
    document.getElementById('proceed-area').style.display = 'block';
    cases[currentCase].eliminatedOnFinish.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('eliminated');
    });
  }
}

function startAutoReveal() {
  const btn = document.getElementById('reveal-btn');
  if (!btn) return;
  btn.textContent = '⏭ Pular tudo';
  btn.onclick = skipAutoReveal;
  revealNextClue();
  autoRevealInterval = setInterval(() => {
    if (currentClue >= cases[currentCase].clues.length) {
      clearInterval(autoRevealInterval);
      autoRevealInterval = null;
      return;
    }
    revealNextClue();
  }, 1200);
}

function skipAutoReveal() {
  clearInterval(autoRevealInterval);
  autoRevealInterval = null;
  const clues = cases[currentCase].clues;
  while (currentClue < clues.length) {
    revealNextClue(true);
  }
}

function restoreSessionState(n) {
  const saved = getCaseData(n).cluesRevealed || 0;
  for (let i = 0; i < saved; i++) {
    revealNextClue(true);
  }
}

// ── Timer ──────────────────────────────────────────────────────────────────
function startAccusationTimer() {
  stopAccusationTimer();
  timeLeft = 90;
  updateTimerDisplay();
  accusationTimer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      stopAccusationTimer();
      showResult(false);
    }
  }, 1000);
}

function stopAccusationTimer() {
  clearInterval(accusationTimer);
  accusationTimer = null;
}

function updateTimerDisplay() {
  const el = document.getElementById('accusation-timer');
  if (!el) return;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  el.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
  el.classList.remove('timer-warning', 'timer-critical');
  if (timeLeft <= 10) el.classList.add('timer-critical');
  else if (timeLeft <= 30) el.classList.add('timer-warning');
}

// ── Tries visual ───────────────────────────────────────────────────────────
function updateTriesVisual() {
  document.querySelectorAll('.try-token').forEach((token, i) => {
    token.classList.toggle('used', i >= tries);
  });
}

// ── Choice ─────────────────────────────────────────────────────────────────
function makeChoice(name) {
  const correct = name === cases[currentCase].answer;
  const entry = { name, correct, timestamp: Date.now() };
  const saved = getCaseData(currentCase);
  const history = [...(saved.guessHistory || []), entry];
  setCaseData(currentCase, { guessHistory: history });
  renderGuessHistory(history);

  if (correct) {
    showResult(true);
  } else {
    tries--;
    updateTriesVisual();
    const container = document.querySelector('.container');
    container.classList.add('flash-wrong');
    setTimeout(() => container.classList.remove('flash-wrong'), 500);
    if (tries <= 0) {
      showResult(false);
    } else {
      const msgs = [
        'Conclusão incorreta. Releia as inferências com calma.',
        'Não é este. Siga a cadeia de Modus Tollens desde a pista 1.',
        'Tente novamente. A lógica aponta para outro suspeito.'
      ];
      document.getElementById('feedback-msg').textContent = msgs[3 - tries - 1] || 'Tente novamente.';
    }
  }
}

// ── Result ─────────────────────────────────────────────────────────────────
function showResult(success) {
  setCaseData(currentCase, { completed: true });
  document.querySelector('.container').classList.add('answers-revealed');
  goTo('screen-result');
  const c = cases[currentCase];
  const content = document.getElementById('result-content');
  if (success) {
    content.innerHTML = `
      <div class="result-box success">
        <span class="result-icon">🔍</span>
        <div class="result-title">Caso Resolvido!</div>
        <p class="result-text">${c.successText}</p>
      </div>
      <div class="ornament">✦ ✦ ✦</div>
    `;
  } else {
    content.innerHTML = `
      <div class="result-box failure">
        <span class="result-icon">🕯️</span>
        <div class="result-title">Investigação Encerrada</div>
        <p class="result-text">${c.failureText}</p>
      </div>
      <div class="ornament">✦ ✦ ✦</div>
    `;
  }
}

// ── Restart ────────────────────────────────────────────────────────────────
function restartCase() {
  resetCaseState();
  setCaseData(currentCase, { cluesRevealed: 0, completed: false });
  renderCaseUI();
  populateNotebook(currentCase);
  goTo(cases[currentCase].introScreen);
}

function resetCaseState() {
  currentClue = 0;
  tries = 3;
  clearInterval(autoRevealInterval);
  autoRevealInterval = null;
  stopAccusationTimer();
  document.querySelector('.container').classList.remove('answers-revealed');
  const clueList = document.getElementById('clue-list');
  if (clueList) clueList.innerHTML = '';
  const revealBtn = document.getElementById('reveal-btn');
  if (revealBtn) { revealBtn.textContent = '▶ Iniciar Revelação'; revealBtn.onclick = startAutoReveal; }
  const revealBtnArea = document.getElementById('reveal-btn-area');
  if (revealBtnArea) revealBtnArea.style.display = 'block';
  const proceedArea = document.getElementById('proceed-area');
  if (proceedArea) proceedArea.style.display = 'none';
  const feedbackMsg = document.getElementById('feedback-msg');
  if (feedbackMsg) feedbackMsg.textContent = '';
  const guessSelect = document.getElementById('guess-select');
  if (guessSelect) guessSelect.value = '';
  updateTriesVisual();
}

// ── Notebook ───────────────────────────────────────────────────────────────
function toggleNotebook() {
  const panel = document.getElementById('notebook-panel');
  const toggle = document.getElementById('notebook-toggle');
  const isOpen = panel.classList.contains('open');
  if (isOpen) {
    panel.classList.remove('open');
    document.body.classList.remove('notebook-open');
    panel.setAttribute('aria-hidden', 'true');
    toggle.textContent = '📓 Caderno';
  } else {
    panel.classList.add('open');
    document.body.classList.add('notebook-open');
    panel.setAttribute('aria-hidden', 'false');
    toggle.textContent = '✕ Fechar';
  }
}

function closeNotebook() {
  const panel = document.getElementById('notebook-panel');
  const toggle = document.getElementById('notebook-toggle');
  if (panel) { panel.classList.remove('open'); panel.setAttribute('aria-hidden', 'true'); }
  if (toggle) toggle.textContent = '📓 Caderno';
  document.body.classList.remove('notebook-open');
}

function showNotebookToggle() {
  const toggle = document.getElementById('notebook-toggle');
  if (toggle) toggle.style.display = 'flex';
}

function hideNotebookToggle() {
  const toggle = document.getElementById('notebook-toggle');
  if (toggle) toggle.style.display = 'none';
  closeNotebook();
}

function populateNotebook(n) {
  const data = getCaseData(n);
  const notesEl = document.getElementById('notebook-notes');
  const hypEl = document.getElementById('notebook-hypothesis');
  const labelEl = document.getElementById('notebook-case-label');
  if (notesEl) notesEl.value = data.notes || '';
  if (labelEl) labelEl.textContent = `Caso nº ${n}`;
  if (hypEl) {
    hypEl.innerHTML = '<option value="">— Minha hipótese —</option>' +
      cases[n].suspects.map(s =>
        `<option value="${s.name}">${s.icon} ${s.name} — ${s.role}</option>`
      ).join('');
    hypEl.value = data.hypothesis || '';
  }
  renderGuessHistory(data.guessHistory || []);
  renderPropositions(n);
}

function renderPropositions(n) {
  const container = document.getElementById('notebook-propositions');
  if (!container) return;
  const props = cases[n] && cases[n].propositions;
  if (!props || props.length === 0) {
    container.innerHTML = '<span class="notebook-prop-empty">Sem proposições disponíveis.</span>';
    return;
  }
  container.innerHTML = `
    <ul class="notebook-propositions-list">
      ${props.map(p => `
        <li class="notebook-prop-item">
          <span class="notebook-prop-letter">${p.letter}</span>
          <span class="notebook-prop-arrow">=</span>
          <span class="notebook-prop-meaning">${p.meaning}</span>
        </li>
      `).join('')}
    </ul>
    <div class="prop-letter-keys">
      ${props.map(p => `
        <button class="logic-key-btn" onclick="insertSymbol('${p.letter}')" title="${p.meaning}">${p.letter}</button>
        <button class="logic-key-btn logic-key-neg" onclick="insertSymbol('¬${p.letter}')" title="Não: ${p.meaning}">¬${p.letter}</button>
      `).join('')}
    </div>
  `;
}

function insertSymbol(sym) {
  const textarea = document.getElementById('notebook-notes');
  if (!textarea) return;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  textarea.value = textarea.value.slice(0, start) + sym + textarea.value.slice(end);
  textarea.selectionStart = textarea.selectionEnd = start + sym.length;
  textarea.focus();
  onNotebookInput();
}

function submitGuess() {
  const select = document.getElementById('guess-select');
  const feedbackMsg = document.getElementById('feedback-msg');
  if (!select || !select.value) {
    if (feedbackMsg) feedbackMsg.textContent = 'Selecione um suspeito antes de confirmar.';
    return;
  }
  const name = select.value;
  const correct = name === cases[currentCase].answer;
  if (!correct) {
    const opt = select.querySelector(`option[value="${name}"]`);
    if (opt) { opt.disabled = true; opt.textContent += ' ✗'; }
    select.value = '';
  }
  makeChoice(name);
}

function renderGuessHistory(history) {
  const list = document.getElementById('notebook-history-list');
  if (!list) return;
  if (!history || history.length === 0) {
    list.innerHTML = '<li class="notebook-history-empty">Nenhuma tentativa ainda.</li>';
    return;
  }
  list.innerHTML = history.map((entry, i) => {
    const icon = entry.correct ? '✓' : '✗';
    const cls = entry.correct ? 'notebook-history-correct' : 'notebook-history-wrong';
    return `<li class="${cls}">${icon} ${entry.name} <span style="color:var(--text3)">(tentativa ${i + 1})</span></li>`;
  }).join('');
}

function onNotebookInput() {
  clearTimeout(notebookSaveTimer);
  notebookSaveTimer = setTimeout(() => {
    const notes = document.getElementById('notebook-notes').value;
    const hypothesis = document.getElementById('notebook-hypothesis').value;
    setCaseData(currentCase, { notes, hypothesis });
    const status = document.getElementById('notebook-save-status');
    if (status) {
      status.textContent = 'Salvo automaticamente ✓';
      setTimeout(() => { status.textContent = ''; }, 2000);
    }
  }, 500);
}
