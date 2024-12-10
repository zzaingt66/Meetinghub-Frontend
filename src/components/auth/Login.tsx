
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Moon, Sun } from 'lucide-react'

export default function Login() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <div className={`flex h-screen w-full items-center justify-center px-4 transition-all duration-500 ${
      isDarkMode 
      ? 'bg-gradient-to-br from-black to-red-950' 
      : 'bg-gradient-to-br from-white to-green-300'
    }`}>
      <Card className="mx-auto max-w-lg min-h-60 backdrop-blur bg-white/30 dark:bg-black/30 border border-white/50 dark:border-grey-500/50 shadow-lg dark:shadow-purple-500/20 transition-all duration-500">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-black dark:text-white hover:text-green-600 dark:hover:text-purple-400"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <CardTitle className="text-2xl font-bold text-black dark:text-white">Login</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-black dark:text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="bg-white/50 dark:bg-purple-900/50 text-black dark:text-white border-green-300 dark:border-purple-600 focus:border-green-500 dark:focus:border-slate-400"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-black dark:text-white">Password</Label>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                className="bg-white/50 dark:bg-purple-900/50 text-black dark:text-white border-green-300 dark:border-purple-600 focus:border-green-500 dark:focus:border-purple-400"
              />
            </div>
            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 dark:bg-purple-700 dark:hover:bg-purple-600 text-white">
              Entrar
            </Button>
          </div>
          <div className="mt-4 text-center text-sm text-black dark:text-white">
            Primera vez?
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

