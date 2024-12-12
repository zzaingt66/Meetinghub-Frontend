import { Navbar } from "@/components/Navbar";
import { CardList } from "@/components/RoomList";
import { SearchBar } from "@/components/SearchBar";

export function Home() {
  return (
    <>
      <Navbar />
      <SearchBar />
      <CardList />
    </>
  );
}
