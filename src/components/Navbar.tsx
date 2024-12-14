import { useAuthStore } from "@/store/authStore";
import { NavbarLogin } from "./Navbar/NavbarLogin";
import { UserDropdown } from "./UserDropdwn";
import { ModeToggle } from "./Navbar/mode-toggle";
import { Link } from "react-router-dom";
import Logo from "@/assets/Logo";

export function Navbar() {
  const { isAuthenticated } = useAuthStore();

  return (
    <nav className="flex justify-between items-center p-3 bg-gray-50 dark:bg-zinc-900 shadow-lg mb- sticky top-0">
      <div className="flex items-center space-x-2">
        <Link to="/">
          <Logo />
        </Link>
        <ModeToggle />
      </div>
      {isAuthenticated ? <UserDropdown /> : <NavbarLogin />}
    </nav>
  );
}
