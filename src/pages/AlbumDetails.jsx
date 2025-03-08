import React from "react";
import { Link, useParams } from "react-router-dom";

function AlbumDetails({collections}) {
  const { id } = useParams();
  const collection = collections?.find((a) => a.id === parseInt(id));

  if (!collection) {
    return <div className="p-6  mx-auto">Album not found.</div>;
  }
  return (
    <div>
      <div className="p-6  mx-auto">

        <h1 className="text-3xl font-bold">{collection?.title}</h1>
        <p className="text-lg">Artist: {collection?.artist}</p>
        <p className="text-lg">Year: {collection?.year}</p>
      </div>
    </div>
  );
}

export default AlbumDetails;
