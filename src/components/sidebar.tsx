import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export function SideBar() {
  const { signOut, currentUser: user } = useAuth();
  const location = useLocation();

  if (location.pathname === "/login") return null;

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link to="/" className="font-bold text-xl">
          Task Manager
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link to="/create-task">
            <Button variant="ghost">Create Task</Button>
          </Link>
          {user?.role === "ADMIN" && (
            <Link to="/admin">
              <Button variant="ghost">Admin</Button>
            </Link>
          )}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {user?.name} ({user?.role})
            </span>
            <Button variant="outline" onClick={signOut}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
