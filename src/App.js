import './App.css';
import { UserContextProvider } from './contexts/user';
import { Home } from './pages';
import React from 'react';

function App() {

  return (
    <UserContextProvider>
      <div className="app">
        <Home />
      </div>
    </UserContextProvider>
  );
}

export default App;
