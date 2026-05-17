const clues = [
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
    text: '"Uma testemunha viu ou Eduardo ou Ana no corredor do sala de cibersegurança — um dos dois estava lá."',
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
];

let currentClue = 0;
let tries = 3;

function goTo(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function revealNextClue() {
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
    ['s-ana','s-bruno','s-diana','s-fernanda','s-eduardo','s-helena','s-gabriel'].forEach(id => {
      document.getElementById(id).classList.add('eliminated');
    });
  }
}

function makeChoice(name) {
  if (name === 'Carlos') {
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
  const content = document.getElementById('result-content');
  if (success) {
    content.innerHTML = `
      <div class="result-box success">
        <span class="result-icon">🔍</span>
        <div class="result-title">Caso Resolvido!</div>
        <p class="result-text">
          Excelente dedução! <strong style="color:var(--green2)">Carlos, o técnico de TI</strong>, roubou o notebook da Cesar School.<br><br>
          <em>Modus Tollens</em> (P→Q, ¬Q) → Ana eliminada.<br>
          <em>Modus Tollens</em> (S→P, ¬P) → Diana eliminada.<br>
          <em>Modus Tollens</em> (U→S, ¬S) → Fernanda eliminada.<br>
          <em>Silogismo Disjuntivo</em> (T∨P, ¬P) → Eduardo presente.<br>
          <em>Modus Ponens</em> (T→R, T) → Carlos presente.<br>
          <em>Negação direta</em> → Eduardo eliminado.<br>
          <em>Modus Tollens</em> (W→Q, ¬Q) → Helena eliminada.<br>
          <em>Silogismo Disjuntivo</em> (W∨V, ¬W) → Gabriel presente.<br>
          <em>Negação direta</em> → Gabriel eliminado.<br>
          <em>Modus Ponens</em> (R→culpado, R) → Carlos é o culpado.
        </p>
      </div>
      <div class="ornament">✦ ✦ ✦</div>
    `;
  } else {
    content.innerHTML = `
      <div class="result-box failure">
        <span class="result-icon">🕯️</span>
        <div class="result-title">Investigação Encerrada</div>
        <p class="result-text">
          Suas tentativas se esgotaram. O culpado era <strong style="color:#e07070">Carlos, o técnico de TI</strong>.<br><br>
          Revise a tabela de inferências para entender o raciocínio completo.
        </p>
      </div>
      <div class="ornament">✦ ✦ ✦</div>
    `;
  }
}

function restartGame() {
  currentClue = 0;
  tries = 3;
  document.getElementById('clue-list').innerHTML = '';
  document.getElementById('reveal-btn-area').style.display = 'block';
  document.getElementById('proceed-area').style.display = 'none';
  document.getElementById('tries-count').textContent = '3';
  document.getElementById('feedback-msg').textContent = '';
  document.querySelectorAll('.suspect-card').forEach(c => c.classList.remove('eliminated'));
  document.querySelectorAll('.choice-btn').forEach(b => { b.disabled = false; b.className = 'choice-btn'; });
  goTo('screen-intro');
}
