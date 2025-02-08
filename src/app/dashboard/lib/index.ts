"use client";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useQuery } from "@tanstack/react-query";
import { Users } from "../daftar-nama/columns";

const useAdminModule = () => {
  const AXAuth = useAxiosAuth();

  const getAllUsers = async (): Promise<Users[]> => {
    return AXAuth.get("/admin/getallusers").then((res) => res.data.data);
  };
  const useGetAllUsers = () => {
    const { data, isPending } = useQuery({
      queryKey: ["users"],
      queryFn: () => getAllUsers(),
    });

    return { data, isPending };
  };

  return { useGetAllUsers };
};

export default useAdminModule;
