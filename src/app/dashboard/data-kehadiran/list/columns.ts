"use client";
import { ColumnDef } from "@tanstack/react-table";
import { LembarDetailResponse } from "../../interface";

export const columns: ColumnDef<LembarDetailResponse>[] = [
  {
    accessorKey: "_id"
  },
  {
    accessorKey: "dari_tgl",
  },
  {
    accessorKey: "sampai_tgl",
  },
  {
    accessorKey: "tgl_list",
  },
  {
    accessorKey: "tgl_free_list",
  },
  {
    accessorKey: "kehadiran"
  },
  {
    accessorKey: "createdAt"
  },
  {
    accessorKey: "updatedAt"
  },
  {
    accessorKey: "__v"
  }
];
