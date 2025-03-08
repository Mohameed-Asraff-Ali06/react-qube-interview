import { Routes, Route } from "react-router-dom";
import "./App.css";
import AlbumCollection from "./pages/AlbumCollection";
import AlbumDetails from "./pages/AlbumDetails";
// import colllection from "./pages/albumsData";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

function App() {
  const [collections, setCollections] = useState([]);
  const [types, setTypes] = useState([]);
  const [filterType, setFilterType] = useState("");
  useEffect(() => {
    fetch("http://localhost:3000/collections")
      .then((res) => res.json())
      .then((data) => {
        setCollections(data);
        setTypes([...new Set(data.map((item) => item.type))]);
      })

      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  
  return (
    <>
      <Navbar collections={collections} />
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
          element={<AlbumDetails collections={collections} />}
        />
      </Routes>
    </>
  );
}

export default App;
