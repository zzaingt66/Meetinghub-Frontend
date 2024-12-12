import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import RoomCard from "./RoomCard";

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

const getRooms = async (): Promise<Room[]> => {
  const { data } = await axios.get("http://localhost:8800/api/rooms");
  return data;
};

export function CardList() {
  const {
    data: rooms,
    isLoading,
    error,
  } = useQuery<Room[], Error>({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });
  console.log(rooms)
  if (isLoading) return <div className="text-center p-4">Loading...</div>;

  if (error)
    return (
      <div className="text-center p-4 text-red-500">Error: {error.message}</div>
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Room Reservations</h1>
      {rooms && rooms.length === 0 ? (
        <div className="text-center text-gray-500">No rooms available</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms?.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}
