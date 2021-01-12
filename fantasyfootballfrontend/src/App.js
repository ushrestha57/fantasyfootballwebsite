import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from "./functions/Navbar";
import Home from "./functions/Home";
import Register from "./functions/Register";
import Login from "./functions/Login";
import Team from "./functions/Team";
import Advice from "./functions/Advice";
export default function App() {
  return (
    <Router>
      <div className="container">
      <Navbar/>
      <br/>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/team" component={Team} />
      <Route path="/register" component={Register} />
       <Route path="/advice" component={Advice} />
      </div>
    </Router>
  );
}
