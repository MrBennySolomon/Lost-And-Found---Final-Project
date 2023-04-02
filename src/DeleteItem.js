/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './DeleteItem.css';

const DeleteItem = ({controller}) => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const response = await controller.model.getAllItems();
    setItems(response.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteHandler = (e) => {
    const id = e.target.getAttribute('id');
    controller.model.deleteItem(id);
    fetchItems();
  }

  return (
    <div className='delete'>
      <h1>DeleteItem</h1>
      <table>
        <thead><tr><th>Name</th><th>Action</th></tr></thead>
        <tbody>
          {items.length > 0 && items.map((item) => <tr key={item.id}><td>{item.name}</td><td className='action' id={item.id} onClick={deleteHandler}>X</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default DeleteItem;