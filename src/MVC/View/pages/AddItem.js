/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/heading-has-content */
import                                   '../../../css/AddItem.css';
import                                   'react-toastify/dist/ReactToastify.css';
import React, {useEffect, useState, useRef} from 'react';
import { useItemsContext }          from '../../../context/context';
import { ToastContainer, toast }    from 'react-toastify';

import axios from 'axios';

const AddItem = () => {
  const nameInputRef = useRef();
  const locationInputRef = useRef();
  const [files, setFiles] = useState("");
  const {
    controller,
    name,
    location,
    setName,
    setLocation,
    setIsLoading,
    isLoading,
  } = useItemsContext();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleChange = (event) => {
    setFiles(event.target.files);
  }

  const handleToastMessage = () => {
    toast.success('Item added', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
      style: {
        backgroundColor: '#2991EA',
        color: '#ffffff',
        fontSize: '2rem',
        textAlign: 'center',
      }
    });
  }
  
  const nameHandler = e => {
    setName(e.target.value);
  };

  const locationHandler = e => {
    setLocation(e.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', name);
    formData.append('location', location);

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    const user = JSON.parse(localStorage.getItem('user'));

    console.log(...formData);

    setIsLoading(true);

    if (files.length > 0) {
    try {
      const response = await fetch('https://localhost:5000/uploads', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Upload successful:', data);
      } else {
        console.error('Upload failed:', response.status);
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  }

  controller.model.addItem({
    name: name,
    location: location,
    userId: user.id,
  });

  const items = JSON.parse(localStorage.getItem('items'));

  items.push({
    name: name,
    location: location,
    userId: user.id,
  })

  localStorage.setItem('items', JSON.stringify(items));

  setIsLoading(false);

  handleToastMessage();
};

  return (
    
    <div className="add-item">
      <ToastContainer/>
      <h1 className="add-item"/>
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
          <input ref={nameInputRef} name="name" id="name" onChange={nameHandler} type="text" placeholder="Name" />
          <input ref={locationInputRef} name="location" id="location" onChange={locationHandler} type="text" placeholder="Location" />
          <input name="file" id="files" onChange={handleChange} type="file" multiple/>
          <button onClick={handleUpload} className="add-btn">save</button>
        </form>
      </div>}
      
    </div>

  );
};

export default AddItem;
