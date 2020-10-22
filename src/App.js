import React from 'react'
import HomePage from "./components/HomePage"
import './App.css'
import { KeywordStore } from "./store"
import Navbar from "react-bootstrap/Navbar"
import Router, { Link } from 'route-lite';
import { BrowserRouter } from 'react-router-dom'
const keywordStore = new KeywordStore()

function App() {
  return (
    <BrowserRouter>
      <Router>
        <Security {...config}>
          <div className="App">
            <Navbar bg="primary" expand="lg" variant="dark" className="page">
              <Navbar.Brand href="#home">Weather App</Navbar.Brand>
            </Navbar>
            <Link component={HomePage} componentProps={{ store: keywordStore }}>
              Weather
            </Link>
          </div>
        </Security>
      </Router>
    </BrowserRouter>
  )
}

export default App
