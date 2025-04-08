import { LogOut } from "lucide-react";
import { SideBar } from "./sidebar";
import { Button } from "./ui/button";
import { useAuth } from "@/context/auth-context";

export function NavBar() {
  const { signOut } = useAuth();
  return (
    <nav className="w-full flex flex-row justify-between items-center p-4 bg-blackcolor2">
      <SideBar />
      <h1 className="text-xl font-medium">Olhar180</h1>
      <Button onClick={signOut} variant="outline">
        <LogOut />
      </Button>
    </nav>
  );
}
