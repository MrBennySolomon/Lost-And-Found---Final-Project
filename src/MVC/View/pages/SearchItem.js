/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/heading-has-content */
import "../../../css/SearchItem.css";
import "../../../css/loader.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useItemsContext } from "../../../context/context";

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
    const response = await controller.model.getAllItems();
    setItems(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const searchHandler = e => {
    const location = e.target.getAttribute("location");
    navigate(`/find/${location}`);
  };

  return (
    <div className="search">
      <h1>
        {isLoading &&
          <div className="loader">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>}
      </h1>
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
                  <td
                    className="action"
                    location={item.location}
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
