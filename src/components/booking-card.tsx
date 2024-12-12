import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card, CardContent } from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";

const HOUR_RATE = 150000; // 150,000 COP per hour
const CLEANING_FEE = 50000; // 50,000 COP
const SERVICE_FEE_RATE = 0.1; // 10% service fee

export function BookingCard({ bookingDetails, onBookingChange }) {
  const [totalHours, setTotalHours] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    if (bookingDetails.startTime && bookingDetails.endTime) {
      const start = new Date(`2000-01-01T${bookingDetails.startTime}`);
      const end = new Date(`2000-01-01T${bookingDetails.endTime}`);
      const diff = (end - start) / (1000 * 60 * 60);
      setTotalHours(diff);
    } else {
      setTotalHours(0);
    }
  }, [bookingDetails.startTime, bookingDetails.endTime]);

  useEffect(() => {
    const roomCost = HOUR_RATE * totalHours;
    const serviceFee = roomCost * SERVICE_FEE_RATE;
    const total = roomCost + CLEANING_FEE + serviceFee;
    setTotalCost(total);
  }, [totalHours]);

  const handleDateChange = (date) => {
    onBookingChange({ date });
  };

  const handleStartTimeChange = (time) => {
    onBookingChange({ startTime: time });
  };

  const handleEndTimeChange = (time) => {
    onBookingChange({ endTime: time });
  };

  const handlePeopleChange = (people) => {
    onBookingChange({ people: parseInt(people) });
  };

  return (
    <Card className="sticky top-4">
      <CardContent className="p-6">
        <div className="flex items-baseline justify-between mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">
              ${HOUR_RATE.toLocaleString()}
            </span>
            <span className="text-gray-600">COP / hora</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start">
                <CalendarDays className="mr-2 h-4 w-4" />
                {bookingDetails.date
                  ? bookingDetails.date.toLocaleDateString()
                  : "Fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={bookingDetails.date}
                onSelect={handleDateChange}
              />
            </PopoverContent>
          </Popover>

          <Select onValueChange={handleStartTimeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Hora inicio" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                <SelectItem
                  key={hour}
                  value={`${hour.toString().padStart(2, "0")}:00`}
                >
                  {`${hour.toString().padStart(2, "0")}:00`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={handleEndTimeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Hora fin" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                <SelectItem
                  key={hour}
                  value={`${hour.toString().padStart(2, "0")}:00`}
                >
                  {`${hour.toString().padStart(2, "0")}:00`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={handlePeopleChange} defaultValue="10">
            <SelectTrigger>
              <SelectValue placeholder="Personas" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "persona" : "personas"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full" size="lg">
          Reservar
        </Button>

        <div className="mt-4 space-y-3">
          <div className="flex justify-between">
            <span className="underline">
              ${HOUR_RATE.toLocaleString()} COP x {totalHours} horas
            </span>
            <span>${(HOUR_RATE * totalHours).toLocaleString()} COP</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Cargo por limpieza</span>
            <span>${CLEANING_FEE.toLocaleString()} COP</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Cargo por servicio</span>
            <span>
              ${(HOUR_RATE * totalHours * SERVICE_FEE_RATE).toLocaleString()}{" "}
              COP
            </span>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${totalCost.toLocaleString()} COP</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
