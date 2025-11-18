import React from 'react'
import './App.css'
import { Route,  createRoutesFromElements, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './pages/Homepage'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Homepage />} />
    )
  )

  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
