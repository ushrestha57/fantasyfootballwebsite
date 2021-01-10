import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
function Navbar() {
    const access_token = localStorage.getItem("access_token");
    const history = useHistory();
    const logout = (e)=>{
        axios.get('http://127.0.0.1:5000/api/logout',
        {
            headers: {
            'Authorization' : 'Bearer ' + access_token
            }
        })
        .then((response) => {
            history.push('/');
        }).catch((err) => {
            console.log(err);
            alert("Unable to log out!");
            
        });
    }
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Fantasy Football Advice</Link>
        <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="navbar-item">
          <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="navbar-item">
          <Link to="/register" className="nav-link">Register</Link>
          </li>
          <li className = "navbar-item">
          <Link to = "/profile" className = "nav-link">Profile</Link>
          </li>
          <li className = "navbar-item">
          <Link to = "/advice" className = "nav-link">Weekly Advice</Link>
          </li>
        </ul>
        <div class="nav pull-right">
          <button type="button" class="btn btn-primary navbar-btn" onClick=  {logout}>
            <span class="glyphicon glyphicon-plus"></span> 
            Logout
          </button>
        </div>
        </div>
      </nav>
    )
};

export default Navbar;