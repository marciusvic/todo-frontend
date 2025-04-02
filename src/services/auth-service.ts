import { useMemo } from "react";
import api from "./api";

export function useAuthService() {
  const services = useMemo(() => {
    return {
      login: async (email: string, password: string) => {
        return api.post("/login", { email, password });
      },
    };
  }, []);
  return services;
}
