import { useState, createContext, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router';
import Auth from './pages/Auth';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup';
import './App.scss';

export const GlobalCtx = createContext(null)

function App() {

  const [gState, setGState] = useState({
    url: "http://localhost:4000", 
    token: null
  })

    //SEEING IF ALREADY LOGGED IN
    useEffect(() => {
      const token = JSON.parse(localStorage.getItem("token"))
      if (token) {
        setGState({...gState, token: token.token})
      }
    }, [])


  return (
    <GlobalCtx.Provider value={{gState, setGState}}>
      <div className="App">
        <h1>Practice App</h1>
        <main>
          <Switch>
            <Route exact path="/" render={(rp => gState.token ? <Home /> : <Auth />)} />
            <Route path="/login" render={(rp) => <Login {...rp}/>} />
            <Route path="/signup" render={(rp) => <Signup {...rp}/>} />
          </Switch>
        </main>
      </div>
    </GlobalCtx.Provider>
  );
}

export default App;
