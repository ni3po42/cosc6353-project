import React from 'react';
//import logo from '../media/logo.svg';
import '../css/App.css';
import container from './container.js';

import Login from './Login.js';

//https://reacttraining.com/react-router/web/guides/quick-start
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function App() {
  return (
      <Router>
      <div className="App">
      
          <nav>
            <ul>
              <li>
                <Link to="/Login">Login</Link>
              </li>
            </ul>
          </nav>
    
          <Route path="/Login" exact render={()=> container.inject(Login) } />
      
      </div>
      </Router>
  );
}

export default App;
