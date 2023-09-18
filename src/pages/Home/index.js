import React from 'react'
import Button from '../../components/Button'

import './style.css'

export const Home = () => {
  return (
    <main className='main_home'>
      <h1 className='main_titulo'>HOME</h1>
      <div className='buttons_wrapper'>
        <Button texto="jogar" caminho="/game"/>
      </div>
    </main>
  )
}
