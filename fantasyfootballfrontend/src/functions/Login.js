import React, { useState, setState } from "react";
import {Form, Button } from 'reactstrap';
import { useHistory} from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from "axios";
function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [invalidLogin, setInvalidLogin] = useState('')
  const history = useHistory();
  const onSubmitClick = (e)=>{
    e.preventDefault();
    console.log("You pressed login")
    let opts = {
      'username': username,
      'password': password
    }
    axios.post('http://127.0.0.1:5000/api/login', {
      method: 'POST',
      body: JSON.stringify(opts)
    }).then(response => {
        console.log(response)
        if (response.data.access_token){
          localStorage.setItem('access_token',response.data.access_token);
          localStorage.setItem('refresh_token',response.data.refresh_token);
          setInvalidLogin(false)
          history.push("/advice");
          window.location.reload(true);  
        }
        else {
            setPassword('')
            setInvalidLogin(true)
            
        }
      })
  }
   const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }


  return (
    <div>
      <h2>Login</h2>
       <Form action="#">
        <div class = "form-group">
          <input class = "form-control" type="text" 
            placeholder="Username" 
            onChange={handleUsernameChange}
            value={username} 
          />
        </div>
        <div class = "form-group">
          <input class = "form-control"
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={password}
          />
        </div>
        <Button onClick={onSubmitClick} type="submit">
          Submit
        </Button>
      </Form>
      {invalidLogin && <div class="alert alert-danger" role="alert">Invalid Login Credentials!</div>}
    </div>
  )
}

export default Login;