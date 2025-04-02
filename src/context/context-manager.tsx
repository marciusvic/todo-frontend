import { ChildrenProps } from "../types/types";
import AuthProvider from "./auth-context";
export function ContextManager({ children }: ChildrenProps) {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}
