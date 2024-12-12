import { PhotoGrid } from "./photo-grid";
import { BookingCard } from "./booking-card";
import { useState } from "react";

function App() {
  const [bookingDetails, setBookingDetails] = useState({
    date: null,
    startTime: null,
    endTime: null,
    people: 10,
  });

  const handleBookingChange = (newDetails) => {
    setBookingDetails((prevDetails) => ({ ...prevDetails, ...newDetails }));
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-4">
            Sala Ejecutiva | Vista Panorámica | Centro de Bogotá
          </h1>
        </div>

        <PhotoGrid />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
          <div className="md:col-span-2">
            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4">
                Bienvenido a nuestra Sala Ejecutiva
              </h2>
              <p className="text-gray-600">
                Esta moderna y espaciosa sala de reuniones está ubicada en el
                corazón de Bogotá, ofreciendo una vista panorámica impresionante
                de la ciudad. Perfecta para reuniones ejecutivas, presentaciones
                y sesiones de trabajo, nuestra sala está equipada con la última
                tecnología y comodidades para garantizar el éxito de su evento.
              </p>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Equipamiento</h3>
                <ul className="grid grid-cols-2 gap-4">
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Proyector 4K</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Videoconferencia</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Wi-Fi de alta velocidad</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Pizarra inteligente</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <BookingCard
              bookingDetails={bookingDetails}
              onBookingChange={handleBookingChange}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
