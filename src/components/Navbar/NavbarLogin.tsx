import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
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
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Link } from "react-router-dom";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Este campo es obligatorio")
    .email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const loginUser = async (credentials: LoginFormValues) => {
  const { data } = await axios.post(
    "https://meetinghub-backend.onrender.com/api/auth/login",
    credentials
  );
  return data;
};

export function NavbarLogin() {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { login } = useAuthStore();

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(
        {
          id: data.user._id,
          name: data.user.name,
          email: data.user.email,
        },
        data.token
      );

      toast.success("Inicio de sesión exitoso", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setIsDialogOpen(false);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Ocurrió un error al iniciar sesión";
      setLoginError(errorMessage);

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    setLoginError(null);
    mutate(data);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="hover:bg-orange-500 text-white">
          Iniciar Sesión
        </Button>
      </DialogTrigger>
      <DialogContent className="h-5/6">
        <DialogHeader>
          <DialogTitle className="text-center my-auto">
            Iniciar Sesión
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 w-10/12 mx-auto"
        >
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">
              Correo
            </label>
            <Input
              type="email"
              placeholder="Cantera@gmail.com"
              className="w-full text-sm"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">
              Contraseña
            </label>
            <Input
              type="password"
              className="w-full text-sm"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {loginError && (
            <div className="text-xs text-red-500 text-center">{loginError}</div>
          )}

          <DialogFooter>
            <div className="mx-auto text-center space-y-4">
              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando Sesión
                  </>
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
              <Link
                to={"/register"}
                onClick={() => setIsDialogOpen(false)}
                className="text-sm text-blue-600 hover:underline"
              >
                Primera vez?
              </Link>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
