import { Link, useLocation } from "react-router-dom";
import { useCollections } from "../contexts/CollectionsContext";

function Navbar() {
  const location = useLocation();
  const { collectionDetails } = useCollections();

  const selectedCollectionId = location.pathname.startsWith("/collection/")
    ? location.pathname.split("/collection/")[1]
    : null;
  const collection = selectedCollectionId
    ? collectionDetails[selectedCollectionId]
    : null;

  return (
    <nav
      className={`w-full flex items-center py-3 px-5 ${
        location.pathname === "/" ? "bg-white" : ""
      }`}
    >
      <div>
        {location.pathname === "/" ? (
          <h1 className="text-xl font-semibold text-black">Overview</h1>
        ) : (
          <h1>
            <Link to="/" className="text-[#677A90] text-xs font-medium">
              Overview
            </Link>{" "}
            &gt;
            <span className="text-xs">
              {" "}
              {collection?.name || "Collection not found"}
            </span>
          </h1>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
