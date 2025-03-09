import React from "react";
import { useParams } from "react-router-dom";

function AlbumDetails({ collectionDetails }) {
  const { id } = useParams(); // Get the album ID from URL
  const collection = collectionDetails[id]; // Fetch the correct album details

  if (!collection) {
    return <div className="p-6 mx-auto text-red-500">Album not found.</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-lg font-medium p-4 bg-white">{collection.name}</p>
      </div>

      {/* Album Details */}
      <div className="bg-white px-8 py-4 m-4 rounded-lg text-xs">
        <div className="grid grid-cols-6 text-left gap-4 font-medium">
          <p>Artist</p>
          <p>Type</p>
          <p>Songs</p>
          <p>Total Size</p>
          <p>Total Duration</p>
          <p>Released On</p>
        </div>
        <div className="grid grid-cols-6 text-left gap-4 mt-2">
          <p>{collection.artist}</p>
          <p>{collection.type}</p>
          <p>{collection.songCount}</p>
          <p>{formatSize(getTotalSize(collection.songs))}</p>
          <p>{formatTotalDuration(getTotalDuration(collection.songs))}</p> {/* ✅ FIXED HERE */}
          <p>{formatDate(collection.releasedOn)}</p>
        </div>
      </div>


      <div className="p-5 m-4 bg-white">
        <table className="w-full border-collapse">
          <thead className="text-sm">
            <tr className="text-left border-b">
              <th className="p-2 border-b font-medium border-gray-300">Song</th>
              <th className="p-2 border-b font-medium border-gray-300">Performers</th>
              <th className="p-2 border-b font-medium border-gray-300">Duration</th>
              <th className="p-2 border-b font-medium border-gray-300">Size</th>
            </tr>
          </thead>
          <tbody>
            {collection.songs?.map((song, index) => (
              <tr key={index} className="border-b text-xs ">
                <td className="p-2">{song.title}</td>
                <td className="p-2">{song.performers.join(", ")}</td>
                <td className="p-2">{formatFullDuration(song.durationInSeconds)}</td>
                <td className="p-2">{formatSize(song.sizeInBytes)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// total duration calculation
const formatTotalDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} minutes ${remainingSeconds} seconds`;
};

//second to duration calculation
const formatFullDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};


// format size
const formatSize = (sizeInBytes) => {
  return sizeInBytes > 1024 * 1024
    ? `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`
    : `${(sizeInBytes / 1024).toFixed(2)} KB`;
};

//format released on
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

//size calculation
const getTotalSize = (songs) => {
  return songs?.reduce((total, song) => total + song.sizeInBytes, 0) || 0;
};

//total duration calculation
const getTotalDuration = (songs) => {
  return songs?.reduce((total, song) => total + song.durationInSeconds, 0) || 0;
};

export default AlbumDetails;
