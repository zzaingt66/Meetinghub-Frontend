import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>Room #{room.roomNumber}</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
      <CardFooter>
        <Button>Reserve</Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;