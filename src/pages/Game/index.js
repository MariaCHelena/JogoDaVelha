import React, { useState, useEffect } from 'react';
import './style.css';
import Button from '../../components/Button';

function App() {
  const quadroVazio = Array(9).fill("");

  const [quadro, setQuadro] = useState(quadroVazio)
  const [jogadorAtual, setJogadorAtual] = useState("O")
  const [vencedor, setVencedor] = useState(null)

const handleCelulaClick = (index) => {

  if (vencedor) {
    console.log("Jogo finalizado.")
    return null;
  }

  if(quadro[index] !== "") {
    return null;
  }

  /*setQuadro(quadro.map((item, itemIndex) => {
    console.log("itemIndex" + itemIndex)
    console.log("index" + index)
    console.log("item" + item)
    if(itemIndex === index){
      return jogadorAtual
    } else {
      return item
    }
    
    }
  ));*/

  quadro[index] = jogadorAtual;

  setJogadorAtual(jogadorAtual === "X" ? "O" : "X");
  checarVencedor();
}

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

    possibilidadesDeVencer.forEach(celulas => {
      if (celulas.every(celula => celula === "O")) setVencedor("O");
      if (celulas.every(celula => celula === "X")) setVencedor("X");
    });

    checarEmpate();
  }

  const checarEmpate = () => {
    if (vencedor){
      if (quadro.every(item => item !== "")) {
        setVencedor("E");
      }
    }
  }

  useEffect(checarVencedor, [quadro]);

  const resetarJogo = () => {
    setJogadorAtual("O");
    setQuadro(quadroVazio)
    setVencedor(null);
  }

  return (
    <section className='main'>
      <header className="board_cabecalho">
        <Button caminho="/" texto="Voltar"/>
        <h1 className='titulo'>Jogo da Velha</h1>
        <Button caminho="/game" texto="Reiniciar"/>
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
      
      {vencedor &&
      <footer>
        {vencedor === "E" ?
          <h2 class="mensagem-vencedor">
            <span className={vencedor}>Empatou!</span>
          </h2>
        :
          <h2 class="mensagem-vencedor">
            <span className={vencedor}>{vencedor}</span> venceu!
          </h2>
        }
        <button onClick={resetarJogo}>Recomeçar jogo!</button>
      </footer>
      }
    </section>
  );
}

export default App;
