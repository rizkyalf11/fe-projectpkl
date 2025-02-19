import React, { useEffect, useState } from "react";
import useAdminModule from "../../lib";
import { useMyStore } from "@/hooks/use-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { parseISO, format } from "date-fns";
import { id } from "date-fns/locale";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, FilePlus } from "lucide-react";

export default function ListLembar() {
  const { setIdLembarAbsen } = useMyStore((state) => state);
  const { useGetLembar } = useAdminModule();
  const { data = [], isPending } = useGetLembar();
  const [pageSize, setPageSize] = useState(() => {
    if (window.innerWidth <= 1024) return 8;
    if (window.innerWidth <= 1280) return 9;
    return 12;
  });

  useEffect(() => {
    const updatePageSize = () => {
      if (window.innerWidth <= 1024) {
        setPageSize(8);
      } else if (window.innerWidth <= 1280) {
        setPageSize(9);
      } else {
        setPageSize(12);
      }
    };

    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  const lembarList = useReactTable({
    data: data || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  if (isPending) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (data.length === 0) {
    return <div className="p-4 text-center">Tidak ada data.</div>;
  }

  return (
    <div className="w-full">
      <Button onClick={() => setIdLembarAbsen("")}>
        <FilePlus />
        Buat Lembar
      </Button>
      <div className="mt-2 grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {lembarList.getRowModel().rows.map((row) => {
          const lembar = row.original;
          return (
            <Card
              onClick={() => setIdLembarAbsen(lembar._id)}
              key={lembar._id}
              className="relative w-full cursor-pointer transition-all duration-150 hover:bg-gray-50"
            >
              <ArrowUpRight className="absolute right-3 top-3 size-5 opacity-50" />
              <CardHeader>
                <CardTitle className="text-lg leading-tight">
                  {format(parseISO(lembar.dari_tgl), "d MMMM yyyy", {
                    locale: id,
                  })}
                  <br />-
                  {format(parseISO(lembar.sampai_tgl), "d MMMM yyyy", {
                    locale: id,
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 text-sm">
                  {lembar.tgl_list.map((tgl) => (
                    <span
                      key={tgl}
                      className={
                        lembar.tgl_free_list.includes(tgl)
                          ? "text-red-400"
                          : "font-medium text-black"
                      }
                    >
                      {tgl}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => lembarList.previousPage()}
          disabled={!lembarList.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => lembarList.nextPage()}
          disabled={!lembarList.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
