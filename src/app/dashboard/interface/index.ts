interface KehadiranDetail {
  tgl: string;
  status: string;
  tgl_lengkap: string;
  _id: string;
}

interface Kehadiran {
  id: string;
  nama: string;
  kehadiran_user_detail: KehadiranDetail[];
  _id: string;
}

interface LembarDetailResponse {
  _id: string;
  dari_tgl: string;
  sampai_tgl: string;
  tgl_list: string[];
  tgl_free_list: string[];
  kehadiran_user: Kehadiran[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type { KehadiranDetail, Kehadiran, LembarDetailResponse };
