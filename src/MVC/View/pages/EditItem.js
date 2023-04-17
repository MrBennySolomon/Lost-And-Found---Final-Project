/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react-hooks/exhaustive-deps */
import '../../../css/EditItem.css';
import '../../../css/loader.css';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react';
import { useItemsContext } from '../../../context/context';
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const EditItem = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState("");
  const {
    items,
    setItems,
    isLoading,
    setIsLoading
  } = useItemsContext();

  const fetchItems = async () => {
    setIsLoading(true);
    const totalItems = JSON.parse(localStorage.getItem('items'));
    setItems(totalItems);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleToastMessage = () => {
    toast.success('✅', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
      style: {
        backgroundColor: 'rgba(26,182,27, 0.5)',
        color: '#07BC0C',
        fontSize: '2rem',
        textAlign: 'center',
        fontWeight: "bold"
      }
    });
  }

  const handleToastMessageFail = () => {
    toast.error("files missing", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
      style: {
        backgroundColor: 'rgba(225,35,31, 0.5)',
        color: "#E74C3C",
        fontSize: "2rem",
        textAlign: "center",
        fontWeight: "bold"
      }
    });
  };

  const handleChange = (event) => {
    setFiles(event.target.files);
  }

  const editHandler = e => {
    e.preventDefault();
    if (localStorage.getItem("token").length < 10) {
      navigate("/login");
    }else if (files.length < 4) {
      handleToastMessageFail();
    }else{
      const name = e.target.getAttribute('name');
      const location = e.target.getAttribute('location');
      console.log('name', name);
      console.log('location', location);

      const formData = new FormData();
      formData.append('name', name);
      formData.append('location', location);

      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      console.log(...formData);
      setIsLoading(true);
      fetch('https://lost-and-found-server-5v26.onrender.com/uploads', {
        method: 'POST' ,
        body: formData,
      })
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);
        handleToastMessage();
      });
    }
  };

  return (
    <div className="edit">
      <ToastContainer/>
      <h1 className="edit-item"/>
      {isLoading &&
          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>}
      {!isLoading &&
      <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 &&
            items.map(item =>
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.location}</td>
                <td className="action" name={item.name} location={item.location} id={item.id} onClick={editHandler}>EDIT</td>
              </tr>
            )}
        </tbody>
      </table>

      <input className='files' name="file" id="files" onChange={handleChange} type="file" multiple/>
      </>}
    </div>
  );
};

export default EditItem;
