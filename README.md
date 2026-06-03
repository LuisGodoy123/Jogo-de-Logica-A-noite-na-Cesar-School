# O Mistério da Cesar School

Jogo de investigação criminal baseado em **lógica proposicional**. O jogador analisa pistas narradas em linguagem natural, acompanha a cadeia formal de inferências e faz sua acusação final — com apenas 3 tentativas.

## Casos disponíveis

### Caso nº 1 — A Noite na Cesar School
Um notebook institucional desaparece da sala de cibersegurança do Brum. Sem arrombamento, sem rastro visível. **8 suspeitos**, todos com acesso ao corredor naquela noite.

### Caso nº 2 — A Sombra na Sala de Estudos
Um corpo é encontrado na sala de estudos após a meia-noite. A janela está fechada por dentro e o sistema de acesso registrou apenas **6 pessoas** no andar.

## Como jogar

1. **Escolha um caso** na tela inicial
2. **Revele as pistas** uma a uma — cada pista é uma proposição lógica em linguagem natural
3. **Estude a análise formal** — tabela de inferências com notação simbólica, regras aplicadas e suspeitos eliminados
4. **Faça sua acusação** — escolha o culpado entre os suspeitos restantes (3 tentativas)

## Regras de inferência utilizadas

| Regra | Forma | Leitura |
|---|---|---|
| Modus Ponens | P → Q, P ⊢ Q | Se a condição vale e a premissa é verdadeira, a conclusão também vale |
| Modus Tollens | P → Q, ¬Q ⊢ ¬P | Se a conclusão é falsa, a premissa também é falsa |
| Silogismo Disjuntivo | P ∨ Q, ¬P ⊢ Q | Se uma das alternativas é falsa, a outra deve ser verdadeira |

## Tecnologias

- HTML5
- CSS3
- JavaScript (vanilla)

## Como executar

Abra o arquivo `index.html` diretamente no navegador. Não requer servidor ou dependências externas.

```
Jogo-de-L-gica---A-noite-na-Cesar-School-/
├── index.html   # estrutura e telas do jogo
├── style.css    # visual e animações
└── script.js   # lógica, casos e interatividade
```

## Contexto

Desenvolvido como projeto educacional para a **Cesar School**, com o objetivo de ensinar lógica proposicional de forma interativa e narrativa.
