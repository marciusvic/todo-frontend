import { JSX, useState } from "react";
import { X, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

interface page {
  icon: JSX.Element;
  title: string;
  permissions: string[];
  submenu: {
    title: string;
    href: string;
    permissions: string;
  }[];
}

interface SideBarProps {
  pages: page[];
}

export default function SideBar(pages: SideBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className="text-primary"
        aria-label="Toggle menu"
      >
        <Menu className="text-whitecolor h-6 w-6" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-300"
          onClick={toggleMenu}
        />
      )}

      <div
        className={cn(
          "fixed top-0 left-0 h-full w-full max-w-xs bg-blackcolor1 z-50 transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-between items-center p-4">
          <h1 className="text-white text-xl font-bold">Dashboads Disparos</h1>
          <button
            onClick={toggleMenu}
            className="text-white"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8">
          <ScrollArea className="flex-1 p-2 pt-0 space-y-2">
            {pages.pages.map((page, index) => (
              <div key={index}>
                <div className="flex items-center text-whitecolor space-x-2 p-2">
                  {page.icon}
                  <span className="text-white">{page.title}</span>
                </div>
                <ul className="space-y-2">
                  {page.submenu.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.href}
                        className="block p-2 text-white hover:bg-primaryColor/40"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ScrollArea>
        </nav>
      </div>
    </>
  );
}
