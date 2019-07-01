import React from 'react';
import '../css/App.css';

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
    
          <Route path="/Login" exact component={Login} />
      
      </div>
      </Router>
  );
}

export default App;
