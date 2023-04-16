/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/heading-has-content */
import                           '../../../css/SearchItem.css';
import                           '../../../css/loader.css';
import React, { useEffect } from 'react';
import { useNavigate }      from 'react-router-dom';
import { useItemsContext }  from '../../../context/context';

const SearchItem = () => {
  const {
    controller,
    items,
    setItems,
    isLoading,
    setIsLoading
  } = useItemsContext();
  const navigate = useNavigate();

  const fetchItems = async () => {
    setIsLoading(true);
    const totalItems = JSON.parse(localStorage.getItem('items'));
    setItems(totalItems);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const searchHandler = e => {
    const name = e.target.getAttribute("name");
    navigate(`/find/${name}`);
  };

  return (
    <div className="search">
      <h1 className="search-item"/>
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
            {items &&
              items.map(item =>
                <tr key={item.userId}>
                  <td>
                    {item.name}
                  </td>
                  <td
                    className="action"
                    name={item.name}
                    onClick={searchHandler}
                  >
                    Take Me
                  </td>
                </tr>
              )}
          </tbody>
        </table>}
    </div>
  );
};

export default SearchItem;
