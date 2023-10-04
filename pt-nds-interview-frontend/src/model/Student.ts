export interface Student {
  nim: number | null;
  nama: string | null;
  alamat: string | null;
  tanggalLahir: string | null;
  noHandphone: string | null;
}

export interface PutAndAddStudentRequest {
  nama: string;
  alamat: string;
  tanggalLahir: string;
  noHandphone: string;
}
