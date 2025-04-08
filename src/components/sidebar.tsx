import { JSX, useState } from "react";
import {
  CircleChevronRightIcon,
  CircleChevronLeftIcon,
  LayoutDashboard,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";

interface MenuItem {
  title: string;
  href: string;
  icon: JSX.Element;
  role?: "ADMIN" | "USER";
}

export function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser: user } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems: MenuItem[] = [
    {
      title: "Tarefas",
      href: "/",
      icon: <LayoutDashboard className="h-5 w-5 mr-2" />,
    },
    {
      title: "Criar tarefa",
      href: "/create-task",
      icon: <UserPlus className="h-5 w-5 mr-2" />,
    },
    {
      title: "Admin",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5 mr-2" />,
      role: "ADMIN",
    },
  ];

  return (
    <>
      <button
        onClick={toggleMenu}
        className="text-whitesec cursor-pointer p-2 hover:bg-gray-100 rounded-full items-center"
        aria-label="Toggle menu"
      >
        <CircleChevronRightIcon className="h-6 w-6" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-300"
          onClick={toggleMenu}
        />
      )}

      <div
        className={cn(
          "fixed top-0 left-0 h-full w-full max-w-[293px] bg-gray-100 z-50 transition-transform duration-300 ease-in-out transform pt-10",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-between items-center pr-5 pl-8">
          <button
            onClick={toggleMenu}
            className="text-whitesec cursor-pointer p-2 hover:bg-gray-200 rounded-full items-center"
            aria-label="Close menu"
          >
            <CircleChevronLeftIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8">
          <ScrollArea className="flex-1 p-2 pt-0 space-y-2">
            <div>
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  if (item.role && item.role !== user?.role) {
                    return null;
                  }
                  return (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        className="p-2 text-gray-950 hover:bg-primary/40 rounded-md transition-colors flex items-center space-x-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </ScrollArea>
        </nav>
      </div>
    </>
  );
}
