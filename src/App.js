import './App.css';
import { UserContextProvider } from './contexts/user';
import { Home, About } from './pages';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { auth } from "./firebase";
import { Navbar } from './containers'

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in...
        console.log(authUser);
        setUser(authUser);
        console.log("user has logged in");
      } else {
        // user has logged out..
        setUser(null);
        console.log("user has logged out");
      }
    });
    return () => {
      // perform some cleanup actions
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      <UserContextProvider>
        <div className="app">
          <Navbar user={user} />
          <Switch>
            <Route path="/" exact>
              <Home user={user} />
            </Route>
            <Route path="/about" exact>
              <About />
            </Route>
          </Switch>
        </div>
      </UserContextProvider>
    </Router>
  );
}

export default App;
