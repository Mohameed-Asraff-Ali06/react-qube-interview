import { Routes, Route } from "react-router-dom";
import "./App.css";
import AlbumCollection from "./pages/AlbumCollection";
import AlbumDetails from "./pages/AlbumDetails";
// import colllection from "./pages/albumsData";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

function App() {
  const [collections, setCollections] = useState([]);
  const [collectionDetails, setCollectionDetails] = useState({});
  const [types, setTypes] = useState([]);
  const [filterType, setFilterType] = useState("");
  useEffect(() => {
    // Fetch collections
    fetch("http://localhost:3000/collections")
      .then((res) => res.json())
      .then((data) => {
        setCollections(data); 
        setTypes([...new Set(data.map((item) => item.type))]); 
      })
      .catch((error) => console.error("Error fetching collections:", error));
  
    // Fetch collectionDetails separately
    fetch("http://localhost:3000/collectionDetails")
      .then((res) => res.json())
      .then((data) => {
        setCollectionDetails(data); 
      })
      .catch((error) => console.error("Error fetching collection details:", error));
  }, []);
  

  return (
    <>
      <div classNam="">
        <Navbar collectionDetails={collectionDetails} />
        <div className="">
          <Routes>
            <Route
              path="/"
              element={
                <AlbumCollection
                  collections={collections}
                  setFilterType={setFilterType}
                  filterType={filterType}
                  types={types}
                />
              }
            />
            <Route
              path="/collection/:id"
              element={<AlbumDetails collectionDetails={collectionDetails} />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
