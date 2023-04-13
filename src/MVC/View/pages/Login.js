/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/heading-has-content */
import                          '../../../css/Login.css';
import React, {useEffect}  from 'react';
import { useNavigate }     from 'react-router-dom';
import { useItemsContext } from '../../../context/context';
import axios               from 'axios';

const Login = () => {
  const navigate = useNavigate();
    const {
    setIsLoading,
    isLoading,
    email,
    setEmail,
    password,
    setPassword
  } = useItemsContext();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const emailInput = (e) => {
    setEmail(e.target.value);
  }

  const passwordInput = (e) => {
    setPassword(e.target.value);
  }

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
    const res = await axios.post("http://127.0.0.1:5000/auth/login",{
      email: email,
      password: password
    });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", email);
    navigate('/');
    }catch(err){
      throw new Error('axios post went wrong: ' + err);
    }
  }

  return (
    <div className='login'>
      <h1 className='login'/>
      {isLoading &&
          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>}
      {!isLoading &&
      <div className="inputs-div">
        <form>
          <input onChange={emailInput} type="email" placeholder="Email" />
          <input onChange={passwordInput} type="password" placeholder="Password" />
          <button onClick={formSubmit} className="add-btn">Login</button>
          <button className='register' onClick={() => navigate('/register')}>Register</button>
        </form>
      </div>}
    </div>
  )
}

export default Login;