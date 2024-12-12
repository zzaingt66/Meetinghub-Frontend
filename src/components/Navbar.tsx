import { useAuthStore } from "@/store/authStore"
import { Login } from "./Header/Login"
import { UserDropdown } from "./UserDropdwn"


export function Navbar() {
  const { isAuthenticated } = useAuthStore()

  return (
    <nav>
      {isAuthenticated ? (
        <UserDropdown />
      ) : (
        <Login />
      )}
    </nav>
  )
}