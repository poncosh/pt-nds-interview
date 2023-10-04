"use client";

import { HeaderWeb } from "@/components/HeaderWeb";
import { PutAndAddStudentRequest } from "@/model/Student";
import {
  getStudentsByNim,
  putStudentsByNim,
} from "@/store/reducer/studentReducer";
import { RootState, useAppDispatch } from "@/store/store";
import { LoadingViews } from "@/views/LoadingViews";
import { useRouter, useParams } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Cek() {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const { nim } = useParams();
  const { selectedStudent: student, isLoading } = useSelector(
    (state: RootState) => state.students
  );
  const [data, setData] = useState<PutAndAddStudentRequest>({
    nama: "",
    alamat: "",
    tanggalLahir: "",
    noHandphone: "",
  });
  const [errors, setErrors] = useState<PutAndAddStudentRequest>({
    nama: "",
    alamat: "",
    tanggalLahir: "",
    noHandphone: "",
  });

  useEffect(() => {
    dispatch(getStudentsByNim(Number(nim))).then(({ payload }) => {
      const {
        nama,
        alamat,
        tanggalLahir,
        noHandphone,
      }: {
        nama: string;
        alamat: string;
        tanggalLahir: string;
        noHandphone: string;
      } = payload;
      setData({
        nama: nama,
        alamat: alamat,
        tanggalLahir: tanggalLahir,
        noHandphone: noHandphone,
      });
    });
  }, []);

  const submitData = (e: SyntheticEvent) => {
    e.preventDefault();

    const regex = new RegExp("^[0-9]+$");

    if (!regex.test(data.noHandphone)) {
      return setErrors({
        ...errors,
        noHandphone: "Phone number must be number!",
      });
    }
    if (Number(data.tanggalLahir.split("-")[0]) > 2005) {
      return setErrors({
        ...errors,
        tanggalLahir: "Students must as least 18 yo!",
      });
    }
    setErrors({ ...errors, tanggalLahir: "", noHandphone: "" });
    const request = {
      nim: Number(nim),
      nama: data.nama,
      alamat: data.alamat,
      tanggalLahir: data.tanggalLahir,
      noHandphone: data.noHandphone,
    };
    dispatch(putStudentsByNim(request));
    push("/");
  };

  if (isLoading || student.nama == null) {
    return <LoadingViews />;
  }
  return (
    <>
      <HeaderWeb />
      <div className="container px-6 mt-3">
        <div className="flex flex-col w-100 mt-3">
          <form className="flex flex-col w-100" onSubmit={submitData}>
            <div className="form-control w-100">
              <label className="label">
                <span className="label-text">Student Name</span>
              </label>
              <input
                type="text"
                name="nama"
                placeholder="Ex.: Lionel Messi"
                className="input input-bordered w-100"
                value={data.nama}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                required={true}
              />
            </div>
            <div className="form-control w-100">
              <label className="label">
                <span className="label-text">Student Address</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24 w-100"
                name="alamat"
                value={data.alamat}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                placeholder="Ex.: Jl. Haji Nawi"
                required={true}
              ></textarea>
            </div>
            <div className="form-control w-100">
              <label className="label">
                <span className="label-text">Birth Date</span>
                <span className="label-text-alt">
                  {errors.tanggalLahir && (
                    <p className="text-red-600">{errors.tanggalLahir}</p>
                  )}
                </span>
              </label>
              <input
                className="input input-bordered"
                type="date"
                name="tanggalLahir"
                value={data.tanggalLahir}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                required={true}
              />
            </div>
            <div className="form-control w-100">
              <label className="label">
                <span className="label-text">Phone Number</span>
                <span className="label-text-alt">
                  {errors.noHandphone && (
                    <p className="text-red-600">{errors.noHandphone}</p>
                  )}
                </span>
              </label>
              <input
                type="text"
                name="noHandphone"
                placeholder="Ex.: 089993193"
                className="input input-bordered w-100"
                value={data.noHandphone}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                required={true}
              />
            </div>
            <div className="flex flex-row justify-center w-100 mt-4">
              <button className="btn btn-success mx-3" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
