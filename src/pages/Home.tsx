import { Header } from "@/components/Header";
import { CardList } from "@/components/RoomList";
import { SearchBar } from "@/components/SearchBar";

export function Home() {
  return (
    <>
      <Header />
      <SearchBar/>
      <CardList />
    </>
  );
}
