import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
            <div key={room._id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">{room.name}</h2>
                <span className="text-gray-500">Room #{room.roomNumber}</span>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                {room.photos && room.photos.length > 0 ? (
                  <img
                    src={room.photos[0]}
                    alt={room.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                )}
                <div>
                  <p className="text-gray-700">{room.city}</p>
                  <p className="text-gray-500">{room.address}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-2">{room.description}</p>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-gray-500">Equipment:</span>
                {room.equipment && room.equipment.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {room.equipment.map((item, index) => (
                      <li key={index} className="text-gray-700">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-gray-500 ml-2">
                    No equipment listed
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500">Price per hour:</span>
                <span className="text-gray-700">${room.pricePerHour}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Max capacity:</span>
                <span className="text-gray-700">{room.maxCapacity}</span>
              </div>
              <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Reserve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
