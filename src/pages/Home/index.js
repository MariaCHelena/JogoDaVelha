import React from "react";
import Button from "../../components/Button";

import "./style.css";

export const Home = () => {
  localStorage.setItem("jogador1", 0);
  localStorage.setItem("jogador2", 0);
  return (
    <main className="main_home">
      <h1 className="main_titulo">JOGO DA VELHA</h1>
      <p>Escolha o modo de jogo:</p>
      <div className="buttons_wrapper">
        <Button texto="Um Jogador" caminho="/singleplayer" />
        <Button texto="Dois Jogadores" caminho="/multiplayer" />
      </div>
    </main>
  );
};
