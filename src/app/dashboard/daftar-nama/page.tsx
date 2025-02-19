"use client"
import React from "react";
import useAdminModule from "../lib";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function DaftarNamaPage() {
  const { useGetAllUsers } = useAdminModule();
  const { data } = useGetAllUsers();
  console.log('data tabel', data)

  return (
    <div className="flex flex-1 flex-col gap-4 pt-0">
      <div
        style={{ height: "calc(100vh - 64px)" }}
        className="w-full overflow-y-auto px-4 pb-4"
      >
        <div className="w-full">
          <DataTable columns={columns} data={data ?? []} />
        </div>
      </div>d
    </div>
  );
}
