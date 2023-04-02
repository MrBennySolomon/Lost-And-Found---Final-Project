/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchItem.css';

const SearchItem = ({target, controller}) => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const fetchItems = async () => {
    const response = await controller.model.getAllItems();
    setItems(response.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const searchHandler = (e) => {
    const location = e.target.getAttribute('location');
    navigate(`/find/${location}`);
  }

  return (
    <div className='search'>
      <h1></h1>
      <table>
        <thead><tr><th>Name</th><th>Action</th></tr></thead>
        <tbody>
          {items.length > 0 && items.map((item) => <tr key={item.id}><td>{item.name}</td><td className='action' location={item.location} onClick={searchHandler}>Take Me</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default SearchItem;