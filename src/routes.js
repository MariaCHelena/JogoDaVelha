import React from 'react';

// Importando as rotas
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Importando as páginas da aplicação
import { Home } from './pages/Home';
import App from './pages/Game';
import { SelecaoJogador } from './pages/SelecaoJogadores'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/game",
    element: <App />
  },
  {
    path: "/selecao",
    element: <SelecaoJogador />
  }
])

export const Routes = () => {
  return (
    <RouterProvider router={router} />
  )
}
