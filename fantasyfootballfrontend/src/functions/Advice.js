import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';
import axios from "axios";
function Advice(){
    let [message, setMessage] = useState('');   
    const access_token = localStorage.getItem("access_token");
    const history = useHistory();
  useEffect(() => {

    axios.get("http://127.0.0.1:5000/api/advice",
    {
        headers: {
            'Authorization' : 'Bearer ' + access_token
        }

    }).then(response => {
        setMessage(response.data);
    }).catch(err =>
    {
        console.log(err)
    })
  }, [])  
  return (
    <div>
    <h1>initial</h1>
    <h2>{JSON.stringify(message)}</h2>
    </div>
  )
};

export default Advice;