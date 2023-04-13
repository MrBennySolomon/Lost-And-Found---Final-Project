/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/heading-has-content */
import                          '../../../css/Register.css';
import React, {useEffect}  from 'react';
import { useNavigate }     from 'react-router-dom';
import { useItemsContext } from '../../../context/context';
import axios               from 'axios';

const Register = () => {
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
    const res = await axios.post("http://127.0.0.1:5000/auth/register",{
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
    <div className='register'>
      <h1 className='register'/>
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
          <input onChange={emailInput} type="text" placeholder="Email" />
          <input onChange={passwordInput} type="password" placeholder="Password" />
          <button onClick={formSubmit} className="add-btn">Register</button>
          <button onClick={() => navigate('/login')} className="login">Login</button>
        </form>
      </div>}
    </div>
  )
}

export default Register;