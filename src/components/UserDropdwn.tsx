import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/authStore";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

export function UserDropdown() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate(); // Hook para redirección

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Función para obtener iniciales del usuario
  const getInitials = (name: string) => {
    if (!name) return "US";
    const names = name.split(" ");
    const initials = names
      .map((n) => n[0])
      .join("")
      .toUpperCase();
    return initials.slice(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={user?.avatar || undefined}
            alt={`Foto de perfil de ${user?.name}`}
          />
          <AvatarFallback>{getInitials(user?.name || "")}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => navigate("/profile")} // Redirige al perfil
        >
          <User className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500 focus:text-red-500 cursor-pointer"
          onSelect={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
