/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/heading-has-content */
import                          '../../../css/Login.css';
import React, {useEffect}  from 'react';
import { useNavigate }     from 'react-router-dom';
import { useItemsContext } from '../../../context/context';

const Login = () => {
  const navigate = useNavigate();
    const {
    controller,
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
    controller.model.loginUser(email, password);
    navigate('/');
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
        </form>
      </div>}
    </div>
  )
}

export default Login;