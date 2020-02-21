import React from 'react'
import HomPage from "./HomePage"
import './App.css'
import { KeyWordStore } from "./store"
import Navbar from "react-bootstrap/Navbar"
const KeyWordStore = new KeyWordStore()

function App() {
  return (
    <div className="App">
      <Navbar bg="info" expand="lg" variant="dark">
        <Navbar.Brand href="#home">Weather App</Navbar.Brand>
      </Navbar>
      <HomePage keywordStore={keywordStore} />
    </div>
  )
}

export default App
