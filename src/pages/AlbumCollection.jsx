import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { downarrowIcon, searchIcon, viewIcon } from "../assets/icons";
import { useCollections } from "../contexts/CollectionsContext";

function AlbumCollection() {
  const { collections, setFilterType, filterType, types } = useCollections();
  const [search, setSearch] = useState("");

  const filteredCollections = collections.filter(
    (collection) =>
      (filterType === "" || collection.type === filterType) &&
      collection.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5 mx-auto ">
      <div className="shadow rounded p-3  bg-white">
        <div className="flex items-center gap-4 mb-4">
          {/* Searchbar */}
          <div className="relative w-[250px]">
            <input
              type="text"
              placeholder="Search"
              className="border border-[#C2CAD3] px-2 py-1.5 w-full rounded-lg pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-[#C2CAD3] font-medium text-sm h-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search"
            />
            <div className="absolute inset-y-0 right-2 flex items-center cursor-pointer h-full">
              <img src={searchIcon} alt="Search Icon" className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Filter */}
          <div className="relative">
            <select
              className="border border-[#C2CAD3] px-2 py-1.5 w-full rounded-lg bg-[#E1E4E9] text-xs font-medium appearance-none pr-8 cursor-pointer h-8"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              <img
                src={downarrowIcon}
                alt="Dropdown Icon"
                className="w-3 h-3"
              />
            </div>
          </div>
        </div>
        {/* Collections Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="text-sm">
              <tr className="text-left border-b border-[#C2CAD3]">
                <th className="p-2 font-medium">Collection Name</th>
                <th className="p-2 font-medium">Type</th>
                <th className="p-2 font-medium">Song Count</th>
                <th className="p-2 font-medium">Duration</th>
                <th className="p-2 font-medium">Size</th>
                <th className="p-2 font-medium">Released On</th>
              </tr>
            </thead>
            <tbody>
              {filteredCollections
                .filter((collection) =>
                  collection?.name
                    ?.toLowerCase()
                    .includes(search?.toLowerCase())
                )
                .map((collection) => (
                  <tr
                    key={collection?.id}
                    className="hover:bg-gray-100 text-xs border-b border-[#E1E4E9]"
                  >
                    <td className="p-2">
                      <div className="flex flex-col">
                        <span className="text-m">{collection?.name}</span>
                        <span className="text-[#677A90]">
                          {collection.artist}
                        </span>
                      </div>
                    </td>
                    <td className="p-2">{collection.type}</td>
                    <td className="p-2">{collection.songCount}</td>
                    <td className="p-2">
                      {new Date(collection.durationInSeconds * 1000)
                        .toISOString()
                        .substring(11, 19)}
                    </td>
                    <td className="p-2">
                      {formatSize(collection.sizeInBytes)}
                    </td>
                    <td className="p-2">
                      {new Date(collection.releasedOn).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td className="p-2">
                      <Link
                        to={`/collection/${collection.id}`}
                        className="text-[#025992] cursor-pointer flex items-center gap-1 text-sm font-medium"
                      >
                        <img
                          src={viewIcon}
                          alt="View Icon"
                          className="w-3 h-3"
                        />
                        <span className="text-xs">View Details</span>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

//size formatting
const formatSize = (bytes) => {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
};
export default AlbumCollection;
