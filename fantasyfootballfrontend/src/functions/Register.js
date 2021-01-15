import React, { useState } from "react";
import {Form, Button } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import axios from "axios";
function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [invalidRegister, setInvalidRegister] = useState('')

  const history = useHistory();
  const onSubmitClick = (e)=>{
    e.preventDefault()
    console.log("You pressed register")
    let opts = {
      'username': username,
      'password': password,
    }
    axios.post('http://127.0.0.1:5000/api/register', {
      method: 'POST',
      body: JSON.stringify(opts)
    }).then(response => {
        if(response.data.access_token)
        {
            localStorage.setItem('access_token',response.data.access_token);
            localStorage.setItem('refresh_token',response.data.refresh_token);
            setInvalidRegister(false)
            history.push("/advice")
            window.location.reload(true);
        }
        else
        {
            setPassword('')
            setUsername('')
            setInvalidRegister(true)
            
        }      
      })
  }
  return (
    <div>
      <h2>Register</h2>
       <Form action="#">
        <div class = "form-group">
          <input class = "form-control" type="text" 
            placeholder="Username" 
            onChange={e => setUsername(e.target.value)}
            value={username} 
          />
        </div>
        <div class = "form-group">
          <input class = "form-control"
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            />
        </div>
        <Button onClick={onSubmitClick} type="submit">
          Submit
        </Button>
      </Form>
      {invalidRegister && <div class="alert alert-danger" role="alert">Username taken!</div>}
    </div>
  )
}
export default Register;