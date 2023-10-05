import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import "../App.css"

function Login({ setIsAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const cookies = new Cookies();
  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username,
      password,
    }).then((res) => {
      const { firstName, lastName, username, token, userId } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      setIsAuth(true);
    });
  };
  return (
    <>
    <div className="login">
      <label className="label"> Login</label>

      <input
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button onClick={login} className="labellogin"> Login</button>
    </div>
     <div className='submit-tag'>
     <p>Project Created By: Simran Sinha</p>
     <a href='https://github.com/Simransinha456' target='_blank' rel="noreferrer">
       <img src="https://cdn-icons-png.flaticon.com/512/3291/3291695.png" width="32" height="32" alt="Github"></img>
     </a>
     <a href='https://www.linkedin.com/in/simran-sinha-54b4241b7/' target='_blank' rel="noreferrer">
       <img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" width="32" height="32" alt="LinkedIn"></img>
     </a>
   </div>
   </>
  );
}

export default Login;
