import { useState, createContext, useContext } from "react";
import Controller from "../MVC/Controller/Controller";

const AppContext = createContext([]);

const AppProvider = ({ children }) => {
  const controller = new Controller();
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        controller,
        name,
        setName,
        location,
        setLocation,
        items,
        setItems
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useItemsContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
