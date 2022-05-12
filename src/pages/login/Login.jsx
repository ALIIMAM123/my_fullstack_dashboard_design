import React , {useState} from 'react';
import "./login.scss";
import {  signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase";
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import { useContext } from 'react';

const Login = () => {
  const [error , setError] = useState(false)
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")

  const navigate = useNavigate()
  const {dispatch} = useContext(AuthContext);
 

  const handleLogin = (e) => {
      e.preventDefault()

      
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    dispatch({type:"LOGIN", payload:user})    //payload: here user comes from firebase
    // console.log(user)
    navigate("/")
    // ...
  })
  .catch((error) => {
    setError(true)
    // const errorCode = error.code;
    // const errorMessage = error.message;
    
  });
  }
  return (
    <div className='login'>
      <form onSubmit={handleLogin}>
      <input type = "email" placeholder='Email' onChange = {e => setEmail(e.target.value)}/>
      <input type = "password" placeholder='password' onChange = {e => setPassword(e.target.value)} /> 
      <button type='submit'>Login</button>
      { error && <span >Wrong Email or Password</span>}
      </form>
    </div>
  );
}

export default Login;
