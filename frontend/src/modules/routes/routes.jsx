import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from '../Authorization/auth'
import PostForm from '../createPost/postForm'
import Home from '../home/home'

const RouterJsx = () => {
  const pages = [
    {
      id: 1,
      path: '/home',
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
      id: 2,
      path: '/',
      name: 'SignIn',
      component: <Auth />,
    },
    {
      id: 3,
      path: '/SignUp',
      name: 'SignUp',
      component: <Auth />,
    },
    {
      id: 4,
      path: '/createPost',
      name: 'createPost',
      component: <PostForm />,
    },
  ]
  return (
    <Routes>
      {pages.map(({ id, path, component, name }) => {
        return <Route path={path} element={component} key={id} />
      })}
    </Routes>
  )
}

export default RouterJsx
