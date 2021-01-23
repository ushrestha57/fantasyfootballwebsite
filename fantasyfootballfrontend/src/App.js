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
import ProtectedRoute from "./functions/ProtectedRoute"
export default function App() {
  return (
    <Router>
      <div className="container">
      <Navbar/>
      <br/>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <ProtectedRoute exact path="/team" component={Team} />
      <ProtectedRoute exact path="/advice" component={Advice} />
      </div>
    </Router>
  );
}
