import React from 'react'
import './App.css'
import { Route,  createRoutesFromElements, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Skills from './pages/Skills'
import Profile from './pages/Profile'
import NewSkill from './pages/NewSkill'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<Homepage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/skills' element={<Skills />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/new' element={<NewSkill />} />
      </Route>
    )
  )

  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
