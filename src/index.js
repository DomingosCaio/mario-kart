const player1 = {
  nome: "Mario",
  velocidade: 4,
  manobrabilidade: 3,
  poder: 3,
  pontos: 0,
};

const player2 = {
  nome: "Luigi",
  velocidade: 3,
  manobrabilidade: 4,
  poder: 4,
  pontos: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.floor(Math.random() * 3);
  const blocks = ["RETA", "CURVA", "CONFRONTO"];

  //   switch (true) {
  //     case random < 0.33:
  //       result = "RETA";
  //       break;
  //     case random < 0.66:
  //       result = "CURVA";
  //       break;
  //     default:
  //       result = "CONFRONTO";
  //   }

  return blocks[random];
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function typeAttack() {
  const random = Math.floor(Math.random() * 2);
  const attackType = ["Casco 🐢", "Bomba 💣"];
  let result = attackType[random];

  return result;
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    const block = await getRandomBlock();
    const diceResult1 = await rollDice();
    const diceResult2 = await rollDice();
    let totalSkillPlayer1 = 0;
    let totalSkillPlayer2 = 0;

    // let block = await getRandomBlock();

    console.log(`🏁 Rodada ${round} \n Bloco: ${block}`);

    // let diceResult1 = await rollDice();
    // let diceResult2 = await rollDice();

    if (block === "RETA") {
      totalSkillPlayer1 = diceResult1 + character1.velocidade;
      totalSkillPlayer2 = diceResult2 + character2.velocidade;

      await logRollResult(
        character1.nome,
        block,
        diceResult1,
        character1.velocidade
      );

      await logRollResult(
        character2.nome,
        block,
        diceResult2,
        character2.velocidade
      );
    }

    if (block === "CURVA") {
      totalSkillPlayer1 = diceResult1 + character1.manobrabilidade;
      totalSkillPlayer2 = diceResult2 + character2.manobrabilidade;

      await logRollResult(
        character1.nome,
        block,
        diceResult1,
        character1.manobrabilidade
      );

      await logRollResult(
        character2.nome,
        block,
        diceResult2,
        character2.manobrabilidade
      );
    }

    if (block === "CONFRONTO") {
      let powerPlayer1 = diceResult1 + character1.poder;
      let powerPlayer2 = diceResult2 + character2.poder;

      console.log(`${character1.nome} confrontou ${character2.nome}!🥊`);

      await logRollResult(
        character1.nome,
        block,
        diceResult1,
        character1.poder
      );

      await logRollResult(
        character2.nome,
        block,
        diceResult2,
        character2.poder
      );

      if (powerPlayer1 > powerPlayer2 && character2.pontos > 0) {
        const attack = await typeAttack();
        attack === "Bomba" && character2.pontos > 1
          ? (character2.pontos -= 2)
          : character2.pontos--;

        console.log(
          `${
            character1.nome
          } venceu o confronto! Lançou ataque do tipo ${attack} e ganhou um ponto de BONUS 👌\n ${
            character2.nome
          } ${
            attack === "Bomba" && character2.pontos > 1
              ? "perdeu dois pontos!"
              : "perdeu um ponto!"
          }`
        );
      }

      if (powerPlayer2 > powerPlayer1 && character1.pontos > 0) {
        const attack = await typeAttack();
        attack === "Bomba" && character1.pontos > 1
          ? (character1.pontos -= 2)
          : character1.pontos--;

        console.log(
          `${
            character2.nome
          } venceu o confronto! Lançou ataque do tipo ${attack} e ganhou um ponto de BONUS 👌\n ${
            character1.nome
          } ${
            attack === "Bomba" && character1.pontos > 1
              ? "perdeu dois pontos!"
              : "perdeu um ponto!"
          }`
        );
      }

      if (powerPlayer1 === powerPlayer2) {
        console.log("Confronto empatado!Nenhum ponto foi perdido");
      }
    }

    if (totalSkillPlayer1 > totalSkillPlayer2) {
      console.log(`${character1.nome} marcou um ponto!`);
      character1.pontos++;
    } else if (totalSkillPlayer1 < totalSkillPlayer2) {
      console.log(`${character2.nome} marcou um ponto!`);
      character2.pontos++;
    }

    console.log("_____________________________________");
  }
}

async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.nome}: ${character1.pontos} ponto(s)`);
  console.log(`${character2.nome}: ${character2.pontos} ponto(s)`);

  if (character1.pontos > character2.pontos)
    console.log(`\n ${character1.nome} venceu a corrida! Parabéns! 🏆`);
  if (character2.pontos > character1.pontos)
    console.log(`\n ${character2.nome} venceu a corrida! Parabéns! 🏆`);

  console.log("A corrida terminou em empate");
}

(async function main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.nome} e ${player2.nome} coneçando... \n`
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
