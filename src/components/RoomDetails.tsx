import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Badge } from "./ui/badge";
import { useAuthStore } from "@/store/authStore";

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

const getRoomDetails = async (roomId: string): Promise<Room> => {
  const { data } = await axios.get(
    `https://meetinghub-backend.onrender.com/api/rooms/${roomId}`
  );
  return data;
};

export function RoomDetails() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const {
    data: room,
    isLoading,
    error,
  } = useQuery<Room, Error>({
    queryKey: ["roomDetails", roomId],
    queryFn: () => getRoomDetails(roomId!),
    enabled: !!roomId,
  });

  const handleBookRoom = () => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: `/rooms/${roomId}`,
          message: "Debes iniciar sesión para reservar",
        },
      });
    } else {
      navigate(`/booking/${roomId}`);
    }
  };

  if (isLoading)
    return <div className="text-center p-4">Cargando detalles...</div>;

  if (error)
    return (
      <div className="text-center p-4 text-red-500">Error: {error.message}</div>
    );

  if (!room) return <div className="text-center p-4">Sala no encontrada</div>;
  console.log(room.equipment);

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{room.name}</CardTitle>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {room.city} - {room.address}
            </div>
            <Badge variant="secondary">Número de sala: {room.roomNumber}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Carousel className="w-full max-w-xl mx-auto mb-6">
            <CarouselContent>
              {room.photos.map((photo, index) => (
                <CarouselItem key={index}>
                  <img
                    src={photo}
                    alt={`Sala ${room.name} - Imagen ${index + 1}`}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          {/* Descripción y detalles */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Descripción</h3>
              <p className="text-gray-600 mb-4">{room.description}</p>

              <h3 className="text-xl font-semibold mb-4">Equipamiento</h3>
              <div className="flex flex-wrap gap-2">
                {room.equipment.map((item, index) => (
                  <Badge key={index} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-gray-100 p-4 rounded-lg dark:text-black ">
                <h3 className="text-xl font-semibold mb-4">
                  Detalles de la Sala
                </h3>
                <div className="space-y-2">
                  <p>
                    <strong>Capacidad Máxima:</strong> {room.maxCapacity}{" "}
                    personas
                  </p>
                  <p>
                    <strong>Precio por Hora:</strong> ${room.pricePerHour}
                  </p>
                  <p>
                    <strong>Ciudad:</strong> {room.city}
                  </p>
                </div>
              </div>

              <Button onClick={handleBookRoom} className="w-full mt-6">
                Reservar Sala
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
