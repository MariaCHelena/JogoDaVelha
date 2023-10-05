import React, { useState, useEffect } from "react";
import "../Multiplayer/style.css";
import Button from "../../components/Button";

export const SinglePlayer = () => {
  const quadroVazio = Array(9).fill("");
  const jogador1 = "X";
  const jogador2 = "O";

  const [quadro, setQuadro] = useState(quadroVazio);
  const [jogadorAtual, setJogadorAtual] = useState(jogador1);
  const [vencedor, setVencedor] = useState(null);

  useEffect(() => {
    if (jogadorAtual === jogador2 && !vencedor) {
      const emptyCells = quadro
        .map((cell, index) => (cell === "" ? index : null))
        .filter((cell) => cell !== null);

      if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const aiMove = emptyCells[randomIndex];

        setTimeout(() => {
          handleCelulaClick(aiMove);
        }, 1000);
      }
    }
  }, [jogadorAtual, quadro, vencedor]);

  const handleCelulaClick = (index) => {
    if (vencedor) {
      console.log("Jogo finalizado.");
      return null;
    }

    if (quadro[index] !== "") {
      return null;
    }

    const novoQuadro = [...quadro];
    novoQuadro[index] = jogadorAtual;

    setQuadro(novoQuadro);
    setJogadorAtual(jogadorAtual === jogador1 ? jogador2 : jogador1);
    checarEmpate();
    checarVencedor();
  };

  const checarVencedor = () => {
    const possibilidadesDeVencer = [
      [quadro[0], quadro[1], quadro[2]],
      [quadro[3], quadro[4], quadro[5]],
      [quadro[6], quadro[7], quadro[8]],

      [quadro[0], quadro[3], quadro[6]],
      [quadro[1], quadro[4], quadro[7]],
      [quadro[2], quadro[5], quadro[8]],

      [quadro[0], quadro[4], quadro[8]],
      [quadro[2], quadro[4], quadro[6]],
    ];

    possibilidadesDeVencer.forEach((celulas) => {
      if (celulas.every((celula) => celula === "O")) {
        let pontuacao = parseInt(localStorage.getItem("jogador1"));
        setVencedor("O");
        localStorage.setItem("jogador1", pontuacao + 1);
      }
      if (celulas.every((celula) => celula === "X")) {
        let pontuacao = parseInt(localStorage.getItem("jogador2"));
        setVencedor("X");
        localStorage.setItem("jogador2", pontuacao + 1);
      }
    });
  };

  const checarEmpate = () => {
    if (quadro.every((item) => item !== "")) {
      setVencedor("E");
    }
  };

  const resetarJogo = () => {
    setJogadorAtual(jogador1);
    setQuadro(quadroVazio);
    setVencedor(null);
  };

  return (
    <section className="main">
      <header className="board_cabecalho">
        <Button caminho="/" texto="Voltar" />
        <h1 className="titulo">Jogo da Velha</h1>
        {vencedor ? (
          <div style={{ width: "100px" }} />
        ) : (
          <div onClick={() => resetarJogo}>
            <Button caminho="/singleplayer" texto="Reiniciar" />
          </div>
        )}
      </header>

      <div className={`quadro ${vencedor ? "game-over" : ""}`}>
        {quadro.map((item, index) => (
          <div
            key={index}
            className={`celula ${item}`}
            onClick={() => handleCelulaClick(index)}
          >
            {item}
          </div>
        ))}
      </div>

      {vencedor && (
        <footer>
          {vencedor === "E" ? (
            <h2 class="mensagem-vencedor">
              <span className={vencedor}>Empatou!</span>
            </h2>
          ) : (
            <h2 class="mensagem-vencedor">
              <span className={vencedor}>{vencedor}</span> venceu!
            </h2>
          )}
          <button onClick={resetarJogo}>Recomeçar jogo!</button>
        </footer>
      )}
    </section>
  );
};
