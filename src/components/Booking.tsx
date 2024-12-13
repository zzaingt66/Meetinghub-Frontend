import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useAuthStore } from "@/store/authStore";

const bookingSchema = z
  .object({
    date: z.string().refine(
      (value) => {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      },
      { message: "La fecha debe ser hoy o en el futuro" }
    ),
    startTime: z.string().refine(
      (value) => {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return timeRegex.test(value);
      },
      { message: "Hora de inicio inválida" }
    ),
    endTime: z.string().refine(
      (value) => {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return timeRegex.test(value);
      },
      { message: "Hora de fin inválida" }
    ),
    numberOfPeople: z
      .number()
      .min(1, "Debe haber al menos una persona")
      .positive("El número de personas debe ser positivo"),
  })
  .refine(
    (data) => {
      const [startHour, startMinute] = data.startTime.split(":").map(Number);
      const [endHour, endMinute] = data.endTime.split(":").map(Number);

      const startTimeInMinutes = startHour * 60 + startMinute;
      const endTimeInMinutes = endHour * 60 + endMinute;

      return endTimeInMinutes > startTimeInMinutes;
    },
    {
      message: "La hora de fin debe ser posterior a la hora de inicio",
      path: ["endTime"],
    }
  );

type BookingFormValues = z.infer<typeof bookingSchema>;

export function BookingForm() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { user, token } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      numberOfPeople: 1,
    },
  });

  const createBooking = useMutation({
    mutationFn: async (bookingData: BookingFormValues) => {
      console.log("Booking Mutation Details:", {
        user,
        token,
        roomId,
        bookingData,
      });
      const response = await axios.post(
        `https://meetinghub-backend.onrender.com/api/reservations/`,
        {
          roomId,
          userId: user?.id,
          date: bookingData.date,
          startTime: bookingData.startTime,
          endTime: bookingData.endTime,
          numberOfPeople: bookingData.numberOfPeople,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },

    onSuccess: () => {
      toast.success("Reserva creada exitosamente");
      navigate(`/rooms/${roomId}`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Error al crear la reserva");
    },
  });

  const onSubmit: SubmitHandler<BookingFormValues> = (data) => {
    createBooking.mutate(data);
  };

  const getCurrentDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  return (
    <Card className="w-[400px] mx-auto">
      <CardHeader>
        <CardTitle>Reservar Sala</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Fecha</Label>
            <Input type="date" {...register("date")} min={getCurrentDate()} />
            {errors.date && (
              <span className="text-red-500 text-sm">
                {errors.date.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Hora de Inicio</Label>
              <Input type="time" {...register("startTime")} />
              {errors.startTime && (
                <span className="text-red-500 text-sm">
                  {errors.startTime.message}
                </span>
              )}
            </div>
            <div>
              <Label>Hora de Fin</Label>
              <Input type="time" {...register("endTime")} />
              {errors.endTime && (
                <span className="text-red-500 text-sm">
                  {errors.endTime.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <Label>Número de Personas</Label>
            <div className="flex items-center">
              <Button
                type="button"
                variant="outline"
                className="mr-2"
                onClick={() => {
                  const currentValue = watch("numberOfPeople") || 1;
                  setValue("numberOfPeople", Math.max(1, currentValue - 1));
                }}
              >
                -
              </Button>
              <Input
                type="number"
                {...register("numberOfPeople", {
                  valueAsNumber: true,
                })}
                className="text-center"
                readOnly
              />
              <Button
                type="button"
                variant="outline"
                className="ml-2"
                onClick={() => {
                  const currentValue = watch("numberOfPeople") || 1;
                  setValue("numberOfPeople", currentValue + 1);
                }}
              >
                +
              </Button>
            </div>
            {errors.numberOfPeople && (
              <span className="text-red-500 text-sm">
                {errors.numberOfPeople.message}
              </span>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Reservando..." : "Confirmar Reserva"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
