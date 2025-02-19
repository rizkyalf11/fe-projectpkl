"use client";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useQuery } from "@tanstack/react-query";
import { Users } from "../daftar-nama/columns";
import { LembarDetailResponse } from "../interface";
import { useMyStore } from "@/hooks/use-store";

const useAdminModule = () => {
  const AXAuth = useAxiosAuth();
  const { idLembarAbsen } = useMyStore((state) => state)

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

  const getLembarDetail = async(id: string): Promise<LembarDetailResponse> => {
    return AXAuth.get(`/absensi/${id}/`).then((res) => res.data)
  }
  const useGetDetailLembar = () => {
    const { data, isFetching } = useQuery({
      queryKey: ["lembardetail", idLembarAbsen],
      queryFn: () => getLembarDetail(idLembarAbsen),
      refetchInterval: 20000,
      refetchOnWindowFocus: true,
      enabled: idLembarAbsen != '',
    })

    return { data, isFetching }
  }

  const getLembar = async():Promise<LembarDetailResponse[]> => {
    return AXAuth.get('/absensi/getall').then((res) => res.data.data);
  }
  const useGetLembar = () => {
    const { data, isPending } = useQuery({
      queryKey: ["lembar"],
      queryFn: () => getLembar(),
      refetchOnWindowFocus: true
    })

    return { data, isPending }
  }

  return { useGetAllUsers, useGetDetailLembar, useGetLembar };
};

export default useAdminModule;
