import { Header } from "@/components/Header";
import { RoomGrid } from "@/components/RoomGrid";
import { SearchBar } from "@/components/SearchBar";
import { useState } from "react";

const sampleRooms = [
  {
    id: "1",
    name: "Sala Ejecutiva",
    location: "Cayambe, Ecuador",
    distance: "A 308 kilómetros de distancia",
    rating: 4.89,
    dates: "11 – 16 de dic",
    price: 696220,
    images: [
      "https://via.placeholder.com/400x400?text=Room+1+Image+1",
      "https://via.placeholder.com/400x400?text=Room+1+Image+2",
      "https://via.placeholder.com/400x400?text=Room+1+Image+3",
    ],
    isFavorite: false,
  },
  {
    id: "2",
    name: "Sala de Conferencias",
    location: "Flandes, Colombia",
    distance: "A 308 kilómetros de distancia",
    rating: 4.67,
    dates: "11 – 16 de dic",
    price: 840960,
    images: [
      "https://via.placeholder.com/400x400?text=Room+2+Image+1",
      "https://via.placeholder.com/400x400?text=Room+2+Image+2",
    ],
    isFavorite: true,
  },
  {
    id: "3",
    name: "Sala de Reuniones",
    location: "Carmen de Apicalá, Colombia",
    distance: "A 301 kilómetros de distancia",
    rating: 4.89,
    dates: "12 – 16 de dic",
    price: 750000,
    images: [
      "https://via.placeholder.com/400x400?text=Room+3+Image+1",
      "https://via.placeholder.com/400x400?text=Room+3+Image+2",
      "https://via.placeholder.com/400x400?text=Room+3+Image+3",
    ],
    isFavorite: false,
  },
  {
    id: "4",
    name: "Sala Creativa",
    location: "Melgar, Colombia",
    distance: "A 315 kilómetros de distancia",
    rating: 4.89,
    dates: "10 – 15 de dic",
    price: 120160,
    images: [
      "https://via.placeholder.com/400x400?text=Room+4+Image+1",
      "https://via.placeholder.com/400x400?text=Room+4+Image+2",
    ],
    isFavorite: false,
  },
];

export function Home() {
  const [rooms, setRooms] = useState(sampleRooms);

  const handleFavoriteClick = (id: string) => {
    setRooms(
      rooms.map((room) =>
        room.id === id ? { ...room, isFavorite: !room.isFavorite } : room
      )
    );
  };
  return (
    <>
      <Header />
      <SearchBar />
      <div className="container mx-auto my-4">
        <RoomGrid rooms={rooms} onFavoriteClick={handleFavoriteClick} />
      </div>
    </>
  );
}
