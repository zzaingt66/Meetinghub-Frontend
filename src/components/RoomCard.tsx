import { Heart } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Room {
  _id: string;
  name: string;
  roomNumber: string;
  city: string;
  address: string;
  photos: string[];
  description: string;
  equipment: string[];
  pricePerHour: number;
  maxCapacity: number;
  featured: boolean;
  bookings: string[];
}

interface RoomCardProps {
  room: Room;
}

const RoomCard = ({ room }: RoomCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/rooms/${room._id}`)}
      className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg  transition-shadow duration-300 cursor-pointer"
    >
      <div className="relative">
        {room.photos && room.photos.length > 0 ? (
          <img
            src={room.photos[0]}
            alt={room.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 border-dashed border-2 flex items-center justify-center">
            No Image
          </div>
        )}
        {/* Botón de favorito */}
        <button
          onClick={toggleFavorite}
          className={`absolute top-2 right-2 p-2 rounded-full shadow-md ${
            isFavorite ? "bg-red-500 text-white" : "bg-white text-gray-800"
          }`}
        >
          <Heart
            size={20}
            className={`transition-colors ${
              isFavorite ? "fill-current text-white" : "text-gray-800"
            }`}
          />
        </button>
      </div>

      {/* Contenido */}
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg truncate">{room.name}</h3>
        </div>
        <p className="text-gray-500 text-sm">{room.address}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-base">${room.pricePerHour} COP</span>
          <span className="text-sm text-gray-500">/ hora</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
