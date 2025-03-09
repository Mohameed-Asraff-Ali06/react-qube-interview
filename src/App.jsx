import { Routes, Route } from "react-router-dom";
import "./App.css";
import AlbumCollection from "./pages/AlbumCollection";
import AlbumDetails from "./pages/AlbumDetails";
import Navbar from "./components/Navbar";
import { CollectionsProvider } from "./contexts/CollectionsContext";

function App() {

  return (
    <>
    <CollectionsProvider>
      <div className="">
        <Navbar  />
        <div className="">
          <Routes>
            <Route
              path="/"
              element={
                <AlbumCollection

                />
              }
            />
            <Route
              path="/collection/:id"
              element={<AlbumDetails  />}
            />
          </Routes>
        </div>
      </div>
      </CollectionsProvider>
    </>
  );
}

export default App;
