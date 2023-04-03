/* eslint-disable jsx-a11y/heading-has-content */
import                          '../../../css/AddItem.css';
import React, { useState } from 'react';
import { useNavigate }     from 'react-router-dom';

const AddItem = ({controller}) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [location, setlocation] = useState('');

  const addHandler = (e) => {
    e.preventDefault();
    controller.model.addItem({
      name,
      location
    });
    navigate('/');
  }

  const nameHandler = (e) => {
    setName(e.target.value);
  }

  const locationHandler = (e) => {
    setlocation(e.target.value);
  }

  return (
    <div className='add-item'>
      <h1></h1>
      <div className='inputs-div'>
        <input onChange={nameHandler} type='text'placeholder='Name'/>
        <input onChange={locationHandler} type='text' placeholder='Location'/>
        <button onClick={addHandler} className='add-btn'>submit</button>
      </div>
    </div>
  )
}

export default AddItem;