/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react-hooks/exhaustive-deps */
import "../../../css/DeleteItem.css";
import "../../../css/loader.css";
import React, { useEffect } from "react";
import { useItemsContext } from "../../../context/context";
import { useNavigate } from "react-router-dom";

const DeleteItem = () => {
  const navigate = useNavigate();
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

  const deleteHandler = e => {
    const id = e.target.getAttribute("id");
    const name = e.target.getAttribute("name");

    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);

    console.log(...formData);
    
    fetch('https://lost-and-found-server-5v26.onrender.com/uploads', {
      method: 'DELETE' ,
      body: formData,
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    })
    controller.model.deleteItem(id);
      navigate('/');
  };

  return (
    <div className="delete">
      <h1 className="delete-item"/>
      {isLoading &&
          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>}
      {!isLoading &&
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 &&
              items.map(item =>
                <tr key={item.id}>
                  <td>
                    {item.name}
                  </td>
                  <td className="action" name={item.name} id={item.id} onClick={deleteHandler}>
                    X
                  </td>
                </tr>
              )}
          </tbody>
        </table>}
    </div>
  );
};

export default DeleteItem;
