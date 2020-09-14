import React from 'react';
import './App.css';
import Welcome from "./Welcome";
import WhishesList from "./WhishesList";
import { Route, BrowserRouter, Switch } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/whishesList" component={WhishesList}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
