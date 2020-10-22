import React from 'react'
import HomePage from "./components/HomePage"
import './App.css'
import { KeywordStore } from "./store"
import Navbar from "react-bootstrap/Navbar"
import { Security, ImplicitCallback, SecureRoute } from "@okta/okta-react"
import Router, { Link, goBack } from 'route-lite';
import { BrowserRouter, Route } from 'react-router-dom'
import Login from "./components/auth/Login"
const keywordStore = new KeywordStore()

const config = {
  issuer: 'https://dev-979265.okta.com/oauth2/default',
  redirectUri: `${window.location.origin}/implicit/callback`,
  clientId: '0oa3abxqyBJhNeYBK4x6',
  pkce: true,
}

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
              {/* <HomePage keywordStore={keywordStore} /> */}
              Weather
            </Link>
            <Link component={Login} componentProps={{ baseUrl: 'https://dev-979265.okta.com' }}>
              Login
            </Link>
            <Route path='/implicit/callback' component={ImplicitCallback} />

          </div>
        </Security>
      </Router>
    </BrowserRouter>
  )
}

export default App
