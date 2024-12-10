import React, { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { CalendarIcon, Search, Clock } from "lucide-react";
import { TimeField } from "./ui/time-field";

export function SearchBar() {
  const [date, setDate] = useState<Date>();
  const [startHour, setStartHour] = useState<number | undefined>(undefined);
  const [endHour, setEndHour] = useState<number | undefined>(undefined);
  const [location, setLocation] = useState<string>("");
  const [peopleCount, setPeopleCount] = useState<number>(1);

  const handleSearch = () => {
    console.log("Searching with:", {
      date,
      startHour:
        startHour !== undefined
          ? startHour.toString().padStart(2, "0")
          : undefined,
      endHour:
        endHour !== undefined ? endHour.toString().padStart(2, "0") : undefined,
      location,
      peopleCount,
    });
  };

  return (
    <Card className="p-4 shadow-lg max-w-4xl mx-auto my-6">
      <div className="flex flex-wrap items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-[240px] justify-start text-left font-normal ${
                !date && "text-muted-foreground"
              }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date
                ? format(date, "PPP", { locale: es })
                : "Selecciona una fecha"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-28 justify-start text-left font-normal ${
                startHour === undefined && "text-muted-foreground"
              }`}
            >
              <Clock className="mr-2 h-4 w-4" />
              {startHour !== undefined
                ? `${startHour.toString().padStart(2, "0")}:00`
                : "Inicio"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4" align="start">
            <TimeField
              value={startHour}
              onChange={(newHour) => setStartHour(newHour)}
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-28 justify-start text-left font-normal ${
                endHour === undefined && "text-muted-foreground"
              }`}
            >
              <Clock className="mr-2 h-4 w-4" />
              {endHour !== undefined
                ? `${endHour.toString().padStart(2, "0")}:00`
                : "Fin"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4" align="start">
            <TimeField
              value={endHour}
              onChange={(newHour) => setEndHour(newHour)}
            />
          </PopoverContent>
        </Popover>

        <Input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1"
          placeholder="Ubicación"
        />
        <div className="flex items-center">
          <span className="mr-2">Personas:</span>
          <Input type="text" className="w-20" placeholder="Personas" />
        </div>

        <Button
          onClick={handleSearch}
          className="bg-rose-500 hover:bg-rose-600 text-white rounded-full w-12 h-12 p-0 flex items-center justify-center"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </Card>
  );
}
