import { SideBar } from "./sidebar";

export function NavBar() {
  return (
    <nav className="w-full flex flex-row justify-between items-center p-4 bg-blackcolor2">
      <SideBar />
    </nav>
  );
}
