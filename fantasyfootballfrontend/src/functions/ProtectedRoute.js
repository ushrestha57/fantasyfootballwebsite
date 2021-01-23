import React, { useEffect, useState } from "react";
import {useHistory, Redirect, Route } from 'react-router-dom';
import axios from "axios";
import config from "../utils/config";

const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
    const [valid,setValid] = useState(null)
    const access_token = localStorage.getItem("access_token");
    const history = useHistory();
    useEffect(() => {
        axios.get(`${config.BACKEND_URL}/loggedin`,
        {
            headers: {
                'Authorization' : 'Bearer ' + access_token
            }
        })
        .then(response =>{
            console.log(response)
            if(response.data){
                setValid(true)
            }
        })
        .catch(err =>{
            console.log(err)
            setValid(false)
        })
    },[])
  return (
    <Route
      {...rest}
      render={props => {
        if (valid) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to="/login"
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;