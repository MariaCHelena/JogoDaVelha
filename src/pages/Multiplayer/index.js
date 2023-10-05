import React, { useState } from "react";
import "./style.css";
import Button from "../../components/Button";

export const Multiplayer = () => {
  const quadroVazio = Array(9).fill("");

  const [quadro, setQuadro] = useState(quadroVazio);
  const [jogadorAtual, setJogadorAtual] = useState("O");
  const [vencedor, setVencedor] = useState(null);

  const handleCelulaClick = (index) => {
    if (vencedor) {
      console.log("Jogo finalizado.");
      return null;
    }

    if (quadro[index] !== "") {
      return null;
    }

    quadro[index] = jogadorAtual;

    setJogadorAtual(jogadorAtual === "X" ? "O" : "X");
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
    setJogadorAtual("X");
    setQuadro(quadroVazio);
    setVencedor(null);
  };

  return (
    <section className="main">
      <header className="board_cabecalho">
        <Button caminho="/" texto="Voltar" />
        <h1 className="titulo">Jogo da Velha</h1>
        {vencedor ? (
          <div style={{width: '100px'}}/>
        ) : (
          <div onClick={() => setQuadro(quadroVazio)}>
            <Button caminho="/multiplayer" texto="Reiniciar" />
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
}