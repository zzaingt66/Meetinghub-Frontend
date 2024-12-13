import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Link, useNavigate } from "react-router-dom";

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

export function Login() {
  const [loginError, setLoginError] = useState<string | null>(null);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(
        {
          id: data._id,
          name: data.name,
          email: data.email,
        },
        data.token
      );

      navigate("/");
      toast.success("Inicio de sesión exitoso", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      {loginError && (
        <div className="text-sm text-red-500 text-center">{loginError}</div>
      )}

      <div className="mx-auto text-center">
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
        <Link to={"/register"}>
          <span>Primrera vez?</span>
        </Link>
      </div>
    </form>
  );
}
