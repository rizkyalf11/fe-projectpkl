import { BaseResponseSuccess } from "@/lib/axiosClient";

/* eslint-disable @typescript-eslint/no-empty-object-type */
interface AdminData {
  _id: string;
  username: string;
  password: string;
  __v: number;
  access_token: string;
}

export interface LoginAdminPayload extends Pick<AdminData, "username" | "password"> {}
export interface LoginAdminResponse extends BaseResponseSuccess {
  data: AdminData;
}