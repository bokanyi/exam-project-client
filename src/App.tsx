import { useState } from 'react'
import { Route } from './components/Route'
import { Home } from './components/Home'
import { Login } from './components/Login'
import './App.css'
import {Dashboard} from './components/Dashboard'

const App = () => {

  return (
    <div className="App">

      <Route path='/'>
        <Home></Home>
      </Route>

      <Route path='/login'>
        <Login></Login>
      </Route>

      <Route path='/dashboard'>
        <Dashboard></Dashboard>
      </Route>

     hello
    </div>
  )
}

export default App
