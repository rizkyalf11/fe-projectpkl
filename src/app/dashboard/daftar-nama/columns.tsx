"use client";
import { ColumnDef } from "@tanstack/react-table";

export type Users = {
  _id: string;
  name: string;
  email: string;
  password: string;
  status: "PKL" | "Magang";
  role: string;
  gender: "pria" | "wanita";
  __v: number;
};

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "role",
    header: "Bagian",
  },
  {
    accessorKey: "gender",
    header: () => <div>JK</div>,
    cell: ({ row }) => {
      return <div className="uppercase">{row.getValue("gender")}</div>
    },
  },
];
