"use client";

import Image from "next/image";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { useState } from "react";

interface PhotoCardProps {
  imageUrl: string;
  author: string;
  liked?: boolean;
}

export default function PhotoCard({ imageUrl, author, liked = false }: PhotoCardProps) {
  const [isLiked, setIsLiked] = useState(liked);

  const toggleLikeValue = () => {
    setIsLiked((prev) => !prev);
    // add logic to update the like status in the backend
    console.log(`Photo by ${author} is now ${!isLiked ? "liked" : "unliked"}`);
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow"
    >
      <Image
        src={imageUrl}
        alt={author + "'s photo"}
        width={720}
        height={480}
        className="w-full h-auto object-cover"
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-2">
        <p className="text-white text-sm">{author}</p>
      </div>
      <div className="absolute bottom-0 right-0 p-2">
        <button
          className="bg-white text-black rounded-full p-2 shadow"
          onClick={toggleLikeValue}
        >
          {isLiked ? (
            <StarIconSolid className="w-5 h-5" />
          ) : (
            <StarIconOutline className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}

