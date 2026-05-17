const cases = {
  1: {
    answer: 'Carlos',
    introScreen: 'screen-intro-1',
    logicScreen: 'screen-logic-1',
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
      {
        text: '"Se Ana estava na sala de cibersegurança, então Bruno, o monitor, também estava."',
        logic: 'P → Q',
        rule: 'Proposição condicional'
      },
      {
        text: '"Bruno saiu mais cedo e não estava na sala de cibersegurança naquela noite."',
        logic: '¬Q',
        rule: 'Negação simples'
      },
      {
        text: '"Se Diana estava na sala de cibersegurança, então Ana também estava — ela nunca ficava sozinha."',
        logic: 'S → P',
        rule: 'Proposição condicional'
      },
      {
        text: '"Fernanda, a coordenadora, só ficava após o horário se Diana também ficasse."',
        logic: 'U → S',
        rule: 'Proposição condicional'
      },
      {
        text: '"Uma testemunha viu ou Eduardo ou Ana no corredor da sala de cibersegurança — um dos dois estava lá."',
        logic: 'T ∨ P',
        rule: 'Proposição disjuntiva'
      },
      {
        text: '"Se Eduardo estava no Brum, ele sempre passava pela sala de cibersegurança para checar os equipamentos."',
        logic: 'T → R',
        rule: 'Proposição condicional'
      },
      {
        text: '"Eduardo tem álibi confirmado: estava em reunião gravada com a direção e não poderia ter agido."',
        logic: '¬culpado(T)',
        rule: 'Negação — eliminação direta'
      },
      {
        text: '"A câmera do corredor registrou: Helena ou Gabriel estava na sala de cibersegurança naquela noite."',
        logic: 'W ∨ V',
        rule: 'Proposição disjuntiva'
      },
      {
        text: '"Se Helena estava na sala de cibersegurança, Bruno obrigatoriamente também estaria — ela nunca entrava sem o monitor."',
        logic: 'W → Q',
        rule: 'Proposição condicional'
      },
      {
        text: '"Gabriel estava de plantão como segurança — seu registro de ronda exclui qualquer envolvimento no furto."',
        logic: '¬culpado(V)',
        rule: 'Negação — eliminação direta'
      },
      {
        text: '"O notebook só poderia ter sido roubado por quem estava na sala de cibersegurança naquela noite."',
        logic: 'R → culpado(R)',
        rule: 'Regra do caso'
      }
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
    suspects: [
      { id: 's2-marcos',   icon: '🧑‍🎓', name: 'Marcos',   role: 'Aluno Veterano' },
      { id: 's2-livia',    icon: '👩‍💻', name: 'Lívia',    role: 'Monitora' },
      { id: 's2-roberto',  icon: '🧹',  name: 'Roberto',  role: 'Zelador' },
      { id: 's2-patricia', icon: '👩‍🏫', name: 'Patrícia', role: 'Prof. de Filosofia' },
      { id: 's2-caio',     icon: '🎬',  name: 'Caio',     role: 'Técnico AV' },
      { id: 's2-sonia',    icon: '📚',  name: 'Sônia',    role: 'Bibliotecária' },
    ],
    clues: [
      {
        text: '"Se Marcos estava na sala de estudos, então Sônia, a bibliotecária, também estava — ela sempre o acompanhava nos turnos noturnos."',
        logic: 'A → F',
        rule: 'Proposição condicional'
      },
      {
        text: '"O registro de ponto de Sônia é claro: ela encerrou seu turno às 21h30 e não retornou ao Brum naquela noite."',
        logic: '¬F',
        rule: 'Negação simples'
      },
      {
        text: '"Caio, o técnico de audiovisual, só montava equipamentos na sala de estudos quando Marcos estava presente para supervisionar."',
        logic: 'E → A',
        rule: 'Proposição condicional'
      },
      {
        text: '"Patrícia só permanecia no campus após as 22h quando Marcos também estava — ela aguardava orientação de alunos sob supervisão."',
        logic: 'D → A',
        rule: 'Proposição condicional'
      },
      {
        text: '"A câmera do corredor captou uma sombra entrando na sala de estudos. Os investigadores concluíram: era Roberto ou Lívia."',
        logic: 'C ∨ B',
        rule: 'Proposição disjuntiva'
      },
      {
        text: '"Roberto, o zelador, tinha uma regra de segurança: nunca ficava no terceiro andar sem Sônia — ela era a responsável pelas chaves do andar."',
        logic: 'C → F',
        rule: 'Proposição condicional'
      },
      {
        text: '"O laudo pericial é conclusivo: o crime só poderia ter sido cometido por alguém que estava fisicamente na sala de estudos naquela noite."',
        logic: 'B → culpado(B)',
        rule: 'Regra do caso'
      }
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
  }
};

let currentCase = 1;
let currentClue = 0;
let tries = 3;

function selectCase(n) {
  currentCase = n;
  resetCaseState();
  renderCaseUI();
  goTo(cases[n].introScreen);
}

function goTo(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToLogic() {
  goTo(cases[currentCase].logicScreen);
}

function goToSelect() {
  resetCaseState();
  goTo('screen-select');
}

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

  const choiceGrid = document.getElementById('choice-grid');
  choiceGrid.innerHTML = c.suspects.map(s => `
    <button class="choice-btn" onclick="makeChoice('${s.name}')">${s.icon}<br>${s.name}</button>
  `).join('');
}

function revealNextClue() {
  const clues = cases[currentCase].clues;
  if (currentClue >= clues.length) return;

  const clue = clues[currentClue];
  const list = document.getElementById('clue-list');
  const li = document.createElement('li');
  li.className = 'clue-item revealed';
  li.innerHTML = `
    <div class="clue-text">${clue.text}</div>
    <div class="clue-logic">${clue.logic}</div>
    <div class="clue-rule">${clue.rule}</div>
  `;
  list.appendChild(li);
  currentClue++;

  if (currentClue >= clues.length) {
    document.getElementById('reveal-btn-area').style.display = 'none';
    document.getElementById('proceed-area').style.display = 'block';
    cases[currentCase].eliminatedOnFinish.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('eliminated');
    });
  }
}

function makeChoice(name) {
  if (name === cases[currentCase].answer) {
    showResult(true);
  } else {
    tries--;
    document.getElementById('tries-count').textContent = tries;
    document.querySelectorAll('.choice-btn').forEach(b => {
      if (b.textContent.trim().includes(name)) {
        b.classList.add('wrong');
        b.disabled = true;
        setTimeout(() => b.classList.remove('wrong'), 500);
      }
    });
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

function showResult(success) {
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

function restartCase() {
  resetCaseState();
  renderCaseUI();
  goTo(cases[currentCase].introScreen);
}

function resetCaseState() {
  currentClue = 0;
  tries = 3;
  const clueList = document.getElementById('clue-list');
  if (clueList) clueList.innerHTML = '';
  const revealBtn = document.getElementById('reveal-btn-area');
  if (revealBtn) revealBtn.style.display = 'block';
  const proceedArea = document.getElementById('proceed-area');
  if (proceedArea) proceedArea.style.display = 'none';
  const triesCount = document.getElementById('tries-count');
  if (triesCount) triesCount.textContent = '3';
  const feedbackMsg = document.getElementById('feedback-msg');
  if (feedbackMsg) feedbackMsg.textContent = '';
}
