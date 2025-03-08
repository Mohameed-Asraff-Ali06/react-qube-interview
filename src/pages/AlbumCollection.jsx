import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { downarrowIcon, searchIcon } from "../assets/icons";

function AlbumCollection({ collections, setFilterType, filterType, types }) {
  const [search, setSearch] = useState("");
  const filteredCollections = collections.filter(
    (collection) =>
      (filterType === "" || collection.type === filterType) &&
      collection.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-[250px]">
          <input
            type="text"
            placeholder="Search"
            className="border border-[#C2CAD3] p-2 w-full rounded-lg pr-10 
             focus:outline-none focus:ring-2 focus:ring-blue-500 
             placeholder-[#C2CAD3] font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search"
          />
          <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
            <img
              src={searchIcon}
              alt="Search Icon"
              className="w-4 h-4"
            />
          </div>
        </div>
        <div className="relative ">
          <select
            className="border p-2 rounded-lg bg-[#E1E4E9] text-sm appearance-none pr-8 cursor-pointer"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type} value={type} >
                {type}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center ">
            <img
              src={downarrowIcon}
              alt="Dropdown Icon"
              className="w-3 h-3"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border p-2">Collection Name</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Songs</th>
              <th className="border p-2">Duration</th>
              <th className="border p-2">Size</th>
              <th className="border p-2">Released On</th>
            </tr>
          </thead>
          <tbody>
            {filteredCollections
              .filter((collection) =>
                collection?.name?.toLowerCase().includes(search?.toLowerCase())
              )
              .map((collection) => (
                <tr key={collection?.id} className="hover:bg-gray-100">
                  <td className="border p-2">
                    <div className="flex flex-col">
                      <span className="font-medium">{collection?.name}</span>
                      <span className="text-gray-600">{collection.artist}</span>
                    </div>
                  </td>
                  <td className="border p-2">{collection.type}</td>
                  <td className="border p-2">{collection.songCount}</td>
                  <td className="border p-2">
                    {" "}
                    {new Date(collection.durationInSeconds * 1000)
                      .toISOString()
                      .substring(11, 19)}
                  </td>
                  <td className="border p-2">
                    {(collection.sizeInBytes / (1024 * 1024)).toFixed(2)} MB
                  </td>
                  <td className="border p-2">
                    {new Date(collection.releasedOn).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td className="border p-2">
                    <Link
                      to={`/collection/${collection.id}`}
                      className="text-blue-500 cursor-pointer"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AlbumCollection;
