import { useState } from 'react'
import { Route } from './components/Route'
import { Home } from './components/Home'
import { Login } from './components/Login'
import './App.css'

function App() {

  return (
    <div className="App">

      <Route path='/'>
        <Home></Home>
      </Route>

      <Route path='/login'>
        <Login></Login>
      </Route>

     hello
    </div>
  )
}

export default App
