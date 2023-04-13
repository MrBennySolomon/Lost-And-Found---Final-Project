/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react-hooks/exhaustive-deps */
import                                     '../../../css/EditItem.css';
import                                     '../../../css/loader.css';
import                                     'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react';
import { useItemsContext }            from '../../../context/context';
import { ToastContainer, toast }      from 'react-toastify';


const EditItem = () => {
  const [files, setFiles] = useState("");
  const {
    controller,
    items,
    setItems,
    isLoading,
    setIsLoading
  } = useItemsContext();

  const fetchItems = async () => {
    setIsLoading(true);
    const response = await controller.model.getAllItems();
    setItems(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleToastMessage = () => {
    toast.success('Item edited', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
      style: {
        backgroundColor: '#4CAF50',
        color: '#ffffff',
        fontSize: '2rem',
        textAlign: 'center',
      }
    });
  }

  const handleChange = (event) => {
    setFiles(event.target.files);
  }

  const editHandler = e => {
    e.preventDefault();
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
              <tr key={item.id}>
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
