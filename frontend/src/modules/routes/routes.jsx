import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from '../Authorization/auth'
import Home from '../home/home'
const RouterJsx = () => {
  const pages = [
    {
      id: 1,
      path: '/',
      name: 'home',
      component: <Home />,
    },
    {
      id: 2,
      path: '/SignIn',
      name: 'SignIn',
      component: <Auth />,
    },
    {
      id: 3,
      path: '/SignUp',
      name: 'SignUp',
      component: <Auth />,
    },
  ]
  return (
    <Routes>
      {pages.map(({ id, path, component, name }) => {
        return <Route path={path} element={component} id={id} />
      })}
    </Routes>
  )
}

export default RouterJsx
