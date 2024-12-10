import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().min(1, "Este campo es obligatorio").email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Formulario enviado:", data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-green-700 text-white">
          Iniciar Sesión
        </Button>
      </DialogTrigger>
      <DialogContent className="h-5/6"> 
        <DialogHeader>
          <DialogTitle className="text-center">Iniciar Sesión</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Correo
            </label>
            <Input
              type="email"
              placeholder="ejemplo@correo.com"
              className="w-full"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              className="w-full"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              Iniciar Sesión
            </Button>
          </DialogFooter>
          <div className="text-sm text-center">
            Primera vez?
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-800 mx-1"
            >
              Regístrate
            </Link>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
