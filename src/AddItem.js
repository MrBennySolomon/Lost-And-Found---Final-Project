import React, { useState } from 'react';
// import Controller from './Controller';
import { useNavigate } from 'react-router-dom';
import './AddItem.css';

const AddItem = ({controller}) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [location, setlocation] = useState('');
  // const controller = new Controller();

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
      <h1>Add Item</h1>
      <input onChange={nameHandler} type='text'placeholder='Name'/>
      <input onChange={locationHandler} type='text' placeholder='Location'/>
      <button onClick={addHandler} className='add-btn'>submit</button>

    </div>
  )
}

export default AddItem;