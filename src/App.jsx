import React from 'react'
import './App.css'
import { Route,  createRoutesFromElements, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Skills from './pages/Skills'
import Profile from './pages/Profile'
import NewSkill from './pages/NewSkill'
import ChangePassword from './pages/settings/ChangePassword'
import NotificationSettings from './pages/settings/NotificationSettings'
import PrivacySettings from './pages/settings/PrivacySettings'
import DeleteAccount from './pages/settings/DeleteAccount'

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
        <Route path='/settings/password' element={<ChangePassword />} />
        <Route path='/settings/notifications' element={<NotificationSettings />} />
        <Route path='/settings/privacy' element={<PrivacySettings />} />
        <Route path='/settings/delete-account' element={<DeleteAccount />} />
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
