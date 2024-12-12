export function PhotoGrid() {
  return (
    <div className="grid grid-cols-4 gap-2 rounded-xl overflow-hidden">
      <div className="col-span-2 row-span-2 relative aspect-square">
        <img
          src="https://via.placeholder.com/800x800"
          alt="Vista principal de la sala de reuniones"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="relative aspect-square">
        <img
          src="https://via.placeholder.com/400x400"
          alt="Área de presentación"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="relative aspect-square">
        <img
          src="https://via.placeholder.com/400x400"
          alt="Equipamiento tecnológico"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="relative aspect-square">
        <img
          src="https://via.placeholder.com/400x400"
          alt="Vista panorámica"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="relative aspect-square">
        <img
          src="https://via.placeholder.com/400x400"
          alt="Área de descanso"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
