import { createContext, useContext, useEffect, useState } from "react";

const CollectionsContext = createContext();

export const CollectionsProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);
  const [collectionDetails, setCollectionDetails] = useState({});
  const [types, setTypes] = useState([]);
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    //collections
    fetch("http://localhost:3000/collections")
      .then((res) => res.json())
      .then((data) => {
        setCollections(data);
        setTypes([...new Set(data.map((item) => item.type))]);
      })
      .catch((error) => console.error("Error fetching collections:", error));

    //collectionDetails
    fetch("http://localhost:3000/collectionDetails")
      .then((res) => res.json())
      .then((data) => {
        setCollectionDetails(data);
      })
      .catch((error) =>
        console.error("Error fetching collection details:", error)
      );
  }, []);

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        collectionDetails,
        types,
        filterType,
        setFilterType,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};

export const useCollections = () => {
  return useContext(CollectionsContext);
};
