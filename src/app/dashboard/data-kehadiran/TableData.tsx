import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { parseISO, format } from "date-fns";
import { id } from "date-fns/locale";
import useAdminModule from "../lib";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMyStore } from "@/hooks/use-store";

export default function TableData() {
  const { setIdLembarAbsen } = useMyStore((state) => state);
  const { useGetDetailLembar } = useAdminModule();
  const { data: LembarKehadiran, isFetching } = useGetDetailLembar();

  console.log("nih", LembarKehadiran);

  if (isFetching) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!LembarKehadiran) {
    return <div className="p-4 text-center">Tidak ada data.</div>;
  }

  return (
    <div className="w-full">
      <Button onClick={() => setIdLembarAbsen("")}>
        <ArrowLeft />
        Kembali
      </Button>
      <div className="mt-2 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead rowSpan={2} className="border-r">
                No
              </TableHead>
              <TableHead rowSpan={2} className="border-r">
                Nama
              </TableHead>
              <TableHead
                colSpan={LembarKehadiran.tgl_list.length}
                className="border-r text-center"
              >
                {format(parseISO(LembarKehadiran.dari_tgl), "d MMMM yyyy", {
                  locale: id,
                })}{" "}
                -{" "}
                {format(parseISO(LembarKehadiran.sampai_tgl), "d MMMM yyyy", {
                  locale: id,
                })}
              </TableHead>
              <TableHead colSpan={3} className="border-r text-center">
                Keterangan
              </TableHead>
            </TableRow>
            <TableRow className="hover:bg-transparent">
              {LembarKehadiran.tgl_list.map((tgl) => {
                const isFree = LembarKehadiran.tgl_free_list.includes(tgl);
                if (isFree) {
                  console.log(tgl);
                }
                return (
                  <TableHead
                    key={tgl}
                    className={`border-r ${isFree && "bg-gray-300"}`}
                  >
                    {tgl}
                  </TableHead>
                );
              })}
              <TableHead className="border-r">HK</TableHead>
              <TableHead className="border-r">Tidak Masuk</TableHead>
              <TableHead className="border-r">Masuk</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {LembarKehadiran.kehadiran_user.map((data, index) => {
              const masuk = data.kehadiran_user_detail.filter(
                (k) => k.status === "H",
              ).length;
              const tidakMasuk = data.kehadiran_user_detail.length - masuk;

              return (
                <TableRow key={index}>
                  <TableCell className="border-r">{index + 1}</TableCell>
                  <TableCell className="border-r">{data.nama}</TableCell>
                  {LembarKehadiran.tgl_list.map((tgl) => {
                    const isFree = LembarKehadiran.tgl_free_list.includes(tgl);

                    const kehadiranObj = data.kehadiran_user_detail.find(
                      (k) => k.tgl === tgl,
                    );
                    return (
                      <TableCell
                        key={tgl}
                        className={`border-r ${isFree && "bg-gray-300"}`}
                      >
                        {isFree ? "" : kehadiranObj ? kehadiranObj.status : ""}
                      </TableCell>
                    );
                  })}
                  <TableCell className="border-r">
                    {LembarKehadiran.tgl_list.length -
                      LembarKehadiran.tgl_free_list.length}
                  </TableCell>
                  <TableCell className="border-r">{tidakMasuk}</TableCell>
                  <TableCell className="border-r">{masuk}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
