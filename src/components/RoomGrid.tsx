import { RoomCard } from './RoomCard';

interface Room {
  id: string;
  name: string;
  location: string;
  distance: string;
  rating: number;
  dates: string;
  price: number;
  images: string[];
  isFavorite?: boolean;
}

interface RoomGridProps {
  rooms: Room[];
  onFavoriteClick?: (id: string) => void;
}

export function RoomGrid({ rooms, onFavoriteClick }: RoomGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          {...room}
          onFavoriteClick={onFavoriteClick}
        />
      ))}
    </div>
  );
}

