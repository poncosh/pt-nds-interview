import { deleteStudentsByNim } from "@/store/reducer/studentReducer";
import Link from "next/link";
import { SyntheticEvent } from "react";

export const TableRow = ({
  nim,
  nama,
  alamat,
  tanggalLahir,
  noHandphone,
  Swal,
  dispatch,
}: {
  nim: number | null;
  nama: string | null;
  alamat: string | null;
  tanggalLahir: string | null;
  noHandphone: string | null;
  Swal: any;
  dispatch: (action: any) => Promise<any>;
}) => {
  // @ts-ignore
  const dob = new Date(tanggalLahir);

  const deleteData = (e: SyntheticEvent) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result: any) => {
      if (result.isConfirmed) {
        dispatch(deleteStudentsByNim(nim));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        return setTimeout(() => {
          location.reload();
        }, 1000);
      }
      return;
    });
  };

  return (
    <tr>
      <td>{nim}</td>
      <td>
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-bold">{nama}</div>
          </div>
        </div>
      </td>
      <td>{alamat}</td>
      <td>{noHandphone}</td>
      <td>
        {dob.toLocaleDateString("id-ID", {
          day: "numeric",
          year: "numeric",
          month: "short",
        })}
      </td>
      <th>
        <button className="btn btn-neutral btn-xs mx-1">
          <Link href={`/${nim}`}>edit</Link>
        </button>
        <button className="btn btn-error btn-xs mx-1" onClick={deleteData}>
          delete
        </button>
      </th>
    </tr>
  );
};
