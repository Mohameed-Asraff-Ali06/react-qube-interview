import { Link, useLocation, useMatch } from "react-router-dom";

function Navbar({ collections }) {
  const location = useLocation();
  const match = useMatch("/collection/:id"); 
  const collection = match ? collections.find((a) => a.id === parseInt(match.params.id)) : null;

  return (
    <nav className="w-full flex items-center border">
      <div className="p-2">
      {location.pathname === "/" ? (
        <h1 className="text-xl font-semibold">Overview</h1>
      ) : (
        <h1 className="text-xl">
          <Link to="/" className="text-blue-500 ">Overview</Link>{" "}
          &gt; <span className="font-semibold text-yellow-400">{collection?.title || "Album"}</span>
        </h1>
      )}
      </div>

    </nav>
  );
}

export default Navbar;
