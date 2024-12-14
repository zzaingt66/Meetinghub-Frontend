import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useAuthStore } from "@/store/authStore";

const registerSchema = z
  .object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z
      .string()
      .min(1, "Debe completar este campo")
      .email("Introduce un email válido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
        "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número"
      ),
    confirmPassword: z.string().min(8, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  // Mutación de React Query para registrar al usuario
  const registerUser = useMutation({
    mutationFn: async (data: RegisterFormValues) => {
      const response = await axios.post(
        "https://meetinghub-backend.onrender.com/api/auth/register",
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Usuario registrado exitosamente");
      useAuthStore.getState().register(
        {
          id: data.user._id,
          name: data.user.name,
          email: data.user.email,
        },
        data.token
      );
      navigate("/");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Hubo un error al registrar"
      );
    },
  });

  // Envío del formulario
  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    registerUser.mutate(data);
  };

  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>Crear cuenta</CardTitle>
        <CardDescription>Ingresa tus datos para registrarte</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid w-full items-center gap-4"
        >
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Tu nombre completo"
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              {...register("email")}
              placeholder="tu@email.com"
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Ingresa una contraseña segura"
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              placeholder="Repite tu contraseña"
            />
            {errors.confirmPassword && (
              <span className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Registrando..." : "Registrarse"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" type="button" onClick={() => navigate("/")}>
          Cancelar
        </Button>
      </CardFooter>
    </Card>
  );
}
