import React from 'react'

export const SelecaoJogador = () => {

	localStorage.setItem("jogador1", 0);
	localStorage.setItem("jogador2", 0);

  return (
    <main className='main_selecao'>
      <div>Selecione</div>
      <div className='selection_wrapper'>
      	<input type="radio" name="simbolo" id="bolinha"/><label for="bolinha">O</label>
      	<input type="radio" name="simbolo" id="xis"/><label for="xis">X</label>
      </div>
    </main>
  )
}
