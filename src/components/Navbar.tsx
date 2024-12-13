import { useAuthStore } from "@/store/authStore";
import { NavbarLogin } from "./Navbar/NavbarLogin";
import { UserDropdown } from "./UserDropdwn";
import Logo from "@/assets/Logo";
import { ModeToggle } from "./Navbar/mode-toggle";

export function Navbar() {
  const { isAuthenticated } = useAuthStore();

  return (
    <nav className="flex justify-between">
      <div className="flex justify-start">
        <Logo />
        <ModeToggle />
      </div>
      {isAuthenticated ? <UserDropdown /> : <NavbarLogin />}
    </nav>
  );
}
