import React, { useState } from "react";
import {Form, Button } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import axios from "axios";
function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [league_id, setLeague_id] = useState('')
  const [s2, setS2] = useState('')
  const [swid, setSwid] = useState('')
  const [teamName, setTeamName] = useState('')

  const history = useHistory();
  const onSubmitClick = (e)=>{
    e.preventDefault()
    console.log("You pressed register")
    let opts = {
      'username': username,
      'password': password,
      'league_id': league_id,
      's2': s2,
      'swid': swid,
      'teamName': teamName

    }
    axios.post('http://127.0.0.1:5000/api/register', {
      method: 'POST',
      body: JSON.stringify(opts)
    }).then(response => {
        console.log(response)
        localStorage.setItem('access_token',response.data.access_token);
        localStorage.setItem('refresh_token',response.data.refresh_token);
        history.push("/advice")      
        
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
        <div class = "form-group">
          <input class = "form-control" type="text" 
            placeholder="League ID" 
            onChange={e => setLeague_id(e.target.value)}
            value={league_id} 
          />
        </div>
        <div class = "form-group">
          <input class = "form-control" type="text" 
            placeholder="S2" 
            onChange={e => setS2(e.target.value)}
            value={s2} 
          />
        </div>
        <div class = "form-group">
          <input class = "form-control" type="text" 
            placeholder="swid" 
            onChange={e => setSwid(e.target.value)}
            value={swid} 
          />
        </div>
        <div class = "form-group">
          <input class = "form-control" type="text" 
            placeholder="Team Name" 
            onChange={e => setTeamName(e.target.value)}
            value={teamName} 
          />
        </div>
        <Button onClick={onSubmitClick} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}
export default Register;