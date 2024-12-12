import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Login } from "./Login";
import Logo from "@/assets/Logo";
import { User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <header className="shadow-sm shadow-gray-500 sticky top-0 z-50 bg-slate-900">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />

          <div>
            {!isAuthenticated && <Login />}

            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-green-600 hover:text-green-800">
                    <User className="mr-2 h-4 w-4" />
                    Mi Cuenta
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Perfil</DropdownMenuItem>
                  <DropdownMenuItem>Mis Reservas</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsAuthenticated(false)}>
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
