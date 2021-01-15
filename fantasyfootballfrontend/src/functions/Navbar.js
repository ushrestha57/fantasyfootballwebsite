import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import '../App.css';

function Navbar() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg" id = "navbar">
        <Link to="/" className="navbar-brand">FantasyAid</Link>
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
          <Link to = "/team" className = "nav-link">Team</Link>
          </li>
          <li className = "navbar-item">
          <Link to = "/advice" className = "nav-link">Weekly Advice</Link>
          </li>
        </ul>
        <Buttons/>
        </div>
      </nav>
    )
};
function Buttons()
{
    let [renderLogin, setRenderLogin] = useState('');   
    const access_token = localStorage.getItem("access_token");
    const history = useHistory();
    useEffect(() =>
    {
        axios.get('http://127.0.0.1:5000/api/loggedin', 
        {
            headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + access_token
            }
        })
        .then((response) => {
            setRenderLogin(false);
        }).catch((err) => {
            setRenderLogin(true);
        });
    },[])
    console.log(renderLogin)
    if(renderLogin)
    {
        return <LoginRegister/>
    }
    else
    {
        return <Logout/>
    }
    
};

function Logout()
{
    const access_token = localStorage.getItem("access_token");
    const history = useHistory();
    const logout = (e)=>{
        axios.post('http://127.0.0.1:5000/api/logout', {}, 
        {
            headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + access_token
            }
        })
        .then((response) => {

            history.push('/');
            window.location.reload(true); 
        }).catch((err) => {
            alert("Unable to log out! You are probably already logged out!");
            
        });
    };
    return (
        <div class="nav pull-right">
          <button type="button" class="btn btn-primary navbar-btn" onClick=  {logout}>
            <span class="glyphicon glyphicon-plus"></span> 
            Logout
          </button>
        </div>
    );

}
function LoginRegister()
{
    const history = useHistory();
    const login = ()=>{
        history.push('/login');
    };
    const register = () =>
    {
        history.push('/register');
    }
    return(
        <div class = "btn-group">
            <div class="nav pull-right">
              <button type="button" class="btn btn-primary navbar-btn ml-auto" onClick=  {login}>
                <span class="glyphicon glyphicon-plus"></span> 
                Login
              </button>
            </div>
            <div class="nav pull-right ">
              <button type="button" class="btn btn-primary navbar-btn" onClick=  {register}>
                <span class="glyphicon glyphicon-plus"></span> 
                Register
              </button>
            </div>
        </div>
    );

}

export default Navbar;