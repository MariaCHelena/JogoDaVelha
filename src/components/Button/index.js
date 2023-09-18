import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Button = (props) => {
  return (
    <Link to={props.caminho} className='button'>{props.texto}</Link>
  )
}

export default Button