"use client";

import { HeaderWeb } from "@/components/HeaderWeb";
import { ModalAdd } from "@/components/ModalAdd";
import { TableRow } from "@/components/TableRow";
import { getStudents } from "@/store/reducer/studentReducer";
import { RootState, useAppDispatch } from "@/store/store";
import { ErrorViews } from "@/views/ErrorViews";
import { LoadingViews } from "@/views/LoadingViews";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function Home() {
  const activePage = !useSearchParams().get("page")
    ? 1
    : useSearchParams().get("page");
  const dispatch = useAppDispatch();
  const {
    dataStudents: students,
    isLoading,
    isError,
    totalPage,
  } = useSelector((state: RootState) => state.students);

  useEffect(() => {
    dispatch(getStudents(activePage));
  }, []);

  if (isLoading || totalPage == null) {
    return <LoadingViews />;
  }
  if (
    (Number(activePage) > totalPage && totalPage !== 0) ||
    Number(activePage) <= 0 ||
    isError
  ) {
    return <ErrorViews />;
  }
  return (
    <>
      <HeaderWeb />
      <div>
        <div className="bg-zinc-200 flex flex-col justify-center items-center min-w-screen min-h-screen">
          <button
            className="btn btn-accent"
            onClick={() =>
              // @ts-ignore
              document.getElementById("modal_add").showModal()
            }
          >
            Add data
          </button>
          {students.length == 0 || totalPage == null ? (
            <h3 className="mt-3">No data, let's add some</h3>
          ) : (
            <div className="container px-6 mt-3">
              <div className="my-3 min-w-screen flex justify-center">
                <div className="join">
                  {Number(activePage) > 1 && (
                    <button className="join-item btn">
                      <a href={`/?page=${Number(activePage) - 1}`}>«</a>
                    </button>
                  )}
                  <button className="join-item btn">Page {activePage}</button>
                  {Number(activePage) < totalPage && (
                    <button className="join-item btn">
                      <a href={`/?page=${Number(activePage) + 1}`}>»</a>
                    </button>
                  )}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead className="bg-black text-white">
                    <tr>
                      <th>NIM</th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Phone Number</th>
                      <th>Date of Birth</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {students.map((student) => {
                      return (
                        <TableRow
                          nim={student.nim}
                          nama={student.nama}
                          alamat={student.alamat}
                          tanggalLahir={student.tanggalLahir}
                          noHandphone={student.noHandphone}
                          Swal={Swal}
                          dispatch={dispatch}
                          key={student.nim}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <ModalAdd />
    </>
  );
}
