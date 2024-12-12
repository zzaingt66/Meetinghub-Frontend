import React from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Heart } from 'lucide-react';

interface RoomCardProps {
  id: string;
  name: string;
  location: string;
  distance: string;
  rating: number;
  dates: string;
  price: number;
  images: string[];
  isFavorite?: boolean;
  onFavoriteClick?: (id: string) => void;
}

export function RoomCard({
  id,
  name,
  location,
  distance,
  rating,
  dates,
  price,
  images,
  isFavorite = false,
  onFavoriteClick
}: RoomCardProps) {
  const [currentImage, setCurrentImage] = React.useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Card className="group relative overflow-hidden">
      {/* Favorite Button */}
      <button
        onClick={() => onFavoriteClick?.(id)}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 transition-colors hover:bg-white"
      >
        <Heart
          className={`h-5 w-5 ${
            isFavorite ? 'fill-rose-500 text-rose-500' : 'text-gray-600'
          }`}
        />
      </button>

      {/* Image Carousel */}
      <div className="relative aspect-square">
        <img
          src={images[currentImage]}
          alt={`${name} - Image ${currentImage + 1}`}
          className="h-full w-full object-cover"
        />
        
        {/* Image Navigation */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 w-1.5 rounded-full ${
                index === currentImage ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 group-hover:block"
              onClick={(e) => {
                e.preventDefault();
                previousImage();
              }}
            >
              ←
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 group-hover:block"
              onClick={(e) => {
                e.preventDefault();
                nextImage();
              }}
            >
              →
            </Button>
          </>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{location}</h3>
            <p className="text-sm text-gray-500">{distance}</p>
          </div>
          <div className="flex items-center gap-1">
            <span>★</span>
            <span>{rating}</span>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">{dates}</p>
        <p className="mt-2">
          <span className="font-semibold">${price.toLocaleString()} COP</span>
          {' '}
          <span className="text-gray-500">noche</span>
        </p>
      </CardContent>
    </Card>
  );
}

