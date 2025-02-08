/* eslint-disable @typescript-eslint/no-explicit-any */
import { AX } from "@/lib/axiosClient";
import { useSession, signOut } from "next-auth/react";
import { useToast } from "./use-toast";

const useAxiosAuth = () => {
  const { toast } = useToast()
  const { data: session, status } = useSession();
  console.log(`token ${session?.user?.access_token}`);

  AX.interceptors.request.use(
    async (config) => {
      if (session?.user?.access_token) {
        config.headers.Authorization = `Bearer ${session.user.access_token}`;
      }
  
      return config;
    },
    (error) => Promise.reject(error)
  );

  AX.interceptors.response.use(
    (response) => response,
    async (error) => {
      if(status === "authenticated") {
        if (error.response?.status === 401) {
          console.error("Token expired. Logging out...");
          await signOut();
          toast({
            title: "Signed Out",
            description: "Token anda sudah habis silahkan masuk ulang.",
          })
        }
        return Promise.reject(error);
      }
    }
  );

  return AX;
};

export default useAxiosAuth;