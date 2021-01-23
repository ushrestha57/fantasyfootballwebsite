import React, { useEffect, useState, Link, Component, Fragment, Search, PropTypes } from "react";
import {useHistory} from 'react-router-dom';
import axios from "axios";

function Player(props)
{
  return(
  <tr>
    <td>{props.rank}</td>
    <td>{props.position}</td>
    <td>{props.name}</td>
    <button></button>
  </tr>
  )
}
function PlayerList(props)
{
    
    let playerData = props.data 
     const listItems = playerData.map((player) =>
     <tr>
        <th>{player.rank}</th>
        <th>{player.position}</th>
        <th>{player.name}</th>
     </tr>
    );

    let players = []
    for(let i = 0; i < playerData.length; ++i)
    {
        players.push(<Player rank = {playerData[i].rank} position = {playerData[i].position} name = {playerData[i].name} />)
    }
    return( 
    <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Position</th>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
          {listItems}
          </tbody>
        </table>
    </div>
    );
}

function Team(){
    let [message, setMessage] = useState('');   
    let [data, setData] = useState([]);

    const access_token = localStorage.getItem("access_token");
    const history = useHistory();
  useEffect(() => {

    axios.get("http://127.0.0.1:5000/api/team",
    {
        headers: {
            'Authorization' : 'Bearer ' + access_token
        }

    }).then(response => {
       console.log(response)
        setData(response.data.list)
    }).catch(err =>
    {
        console.log(err)
    })
  }, [])  

    useEffect( ()=>{
        console.log("handling change for data")
    }, [data] )

  return (
    <PlayerList data = {data} />
  )
};

export default Team;