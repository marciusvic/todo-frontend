import { Home } from "lucide-react";
import SideBar from "./sidebar";

export function NavBar() {
  const pages = [
    {
      icon: <Home />,
      title: "Inicial",
      permissions: [],
      submenu: [
        {
          title: "home",
          href: "/",
          permissions: "",
        },
        {
          title: "login",
          href: "/login",
          permissions: "",
        },
      ],
    },
  ];
  return (
    <nav className="w-full flex flex-row justify-between items-center p-4 bg-blackcolor2">
      <SideBar pages={pages} />
    </nav>
  );
}
