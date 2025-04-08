import { ChildrenProps } from "../types/types";
import AuthProvider from "./auth-context";
import TaskProvider from "./task-context";
export function ContextManager({ children }: ChildrenProps) {
  return (
    <>
      <AuthProvider>
        <TaskProvider>{children}</TaskProvider>
      </AuthProvider>
    </>
  );
}
