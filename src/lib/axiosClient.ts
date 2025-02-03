/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from "axios";

export const AX: AxiosInstance = axios.create({
  baseURL: "https://beabsenfscm.vercel.app/",
  headers: { "Content-Type": "application/json" },
});

export interface BaseResponseSuccess {
  status: string;
  message: string;
  data?: any;
}

// export interface BaseResponsePagination {
//   status: string;
//   message: string;
//   pagination: {
//     page: number;
//     limit: number;
//     pageSize: number;
//     total: number;
//   };
// }