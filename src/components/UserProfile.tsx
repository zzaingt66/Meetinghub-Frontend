import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "/components/ui/avatar";
import { Button } from "/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "/components/ui/card";
import { Input } from "/components/ui/input";
import { Label } from "/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "/components/ui/select";
import { Textarea } from "/components/ui/textarea";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Desarrollador web apasionado",
    country: "España",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setUserData((prevData) => ({
      ...prevData,
      country: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Lógica para eliminar cuenta
  };

  return (
    <div className="bg-gray-100 p-4 md:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Perfil de usuario</CardTitle>
          <CardDescription>Información y opciones de cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/nutlope.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-bold">{userData.name}</h2>
              <p className="text-sm text-gray-600">{userData.email}</p>
            </div>
          </div>
          {isEditing ? (
            <form className="space-y-4" onSubmit={handleUpdate}>
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={userData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  value={userData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="bio">Biografía</Label>
                <Textarea
                  id="bio"
                  value={userData.bio}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="country">País</Label>
                <Select
                  onValueChange={handleSelectChange}
                  defaultValue={userData.country}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="País" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="España">España</SelectItem>
                    <SelectItem value="México">México</SelectItem>
                    <SelectItem value="Estados Unidos">
                      Estados Unidos
                    </SelectItem>
                    <SelectItem value="Colombia">Colombia</SelectItem>
                    <SelectItem value="Argentina">Argentina</SelectItem>
                    <SelectItem value="Ecuador">Ecuador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="primary" type="submit">
                Actualizar
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">{userData.bio}</p>
              <p className="text-sm text-gray-600">País: {userData.country}</p>
              <Button variant="secondary" onClick={() => setIsEditing(true)}>
                Editar perfil
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Eliminar cuenta
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-600">
            Última actualización: 10 de enero de 2023
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfilePage;
