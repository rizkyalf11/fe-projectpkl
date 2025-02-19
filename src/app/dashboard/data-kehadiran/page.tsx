"use client";
import React from "react";
import TableData from "./TableData";
import { useMyStore } from "@/hooks/use-store";
import ListLembar from "./list/ListLembar";

export default function DataKehadiranPage() {
  const { idLembarAbsen } = useMyStore((state) => state);

  return (
    <div className="flex flex-1 flex-col gap-4 pt-0">
      <div
        style={{ height: "calc(100vh - 64px)" }}
        className="w-full overflow-y-auto px-4 pb-4"
      >
        {idLembarAbsen !== "" ? <TableData /> : <ListLembar />}
      </div>
    </div>
  );
}
