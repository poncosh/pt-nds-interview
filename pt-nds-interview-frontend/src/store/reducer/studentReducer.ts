import { PutAndAddStudentRequest, Student } from "@/model/Student";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const baseURL = "http://localhost:8080";

export interface StudentState {
  isLoading: boolean;
  isError: boolean;
  response: object;
  selectedStudent: Student;
  dataStudents: Student[];
  totalPage: number | null;
}

const initialState: StudentState = {
  isLoading: false,
  isError: false,
  response: {},
  selectedStudent: {
    nim: null,
    nama: null,
    alamat: null,
    tanggalLahir: null,
    noHandphone: null,
  },
  dataStudents: [],
  totalPage: null,
};

export const postStudents = createAsyncThunk(
  "students/create",
  async (student: PutAndAddStudentRequest) => {
    try {
      const { data } = await axios.post(`${baseURL}/api/students`, student, {
        headers: { "Content-Type": "application/json" },
      });

      return data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please check your input!",
      });
    }
  }
);

export const getStudents = createAsyncThunk(
  "students/all",
  async (page: string | 1 | null) => {
    try {
      const { data } = await axios.get(`${baseURL}/api/students?page=${page}`);

      return data;
    } catch (error) {
      return [];
    }
  }
);

export const getStudentsByNim = createAsyncThunk(
  "students/specific",
  async (nim: number) => {
    try {
      const { data } = await axios.get(`${baseURL}/api/students/${nim}`);

      const student = data.data;
      return student;
    } catch (error) {
      throw error;
    }
  }
);

export const putStudentsByNim = createAsyncThunk(
  "students/put",
  async (request: Student) => {
    try {
      const { nim, nama, alamat, tanggalLahir, noHandphone } = request;
      const requestData = {
        nama,
        alamat,
        tanggalLahir,
        noHandphone,
      };

      const { data } = await axios.put(
        `${baseURL}/api/students/${nim}`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please check your input!",
      });
    }
  }
);

export const deleteStudentsByNim = createAsyncThunk(
  "students/delete",
  async (nim: number | null) => {
    try {
      await axios.delete(`${baseURL}/api/students/${nim}`);
    } catch (error) {
      throw error;
    }
  }
);

export const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder
      .addCase(postStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postStudents.fulfilled, (state, { payload }) => {
        state.response = payload;
        state.isLoading = false;
      })
      .addCase(postStudents.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.response = { message: payload };
      })
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudents.fulfilled, (state, { payload }) => {
        state.dataStudents = payload.data.content;
        state.totalPage = payload.totalPages;
        state.isLoading = false;
      })
      .addCase(getStudents.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getStudentsByNim.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentsByNim.fulfilled, (state, { payload }) => {
        state.selectedStudent = payload;
        state.isLoading = false;
      })
      .addCase(putStudentsByNim.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(putStudentsByNim.fulfilled, (state, { payload }) => {
        state.response = payload;
        state.isLoading = false;
      });
  },
});

export default studentSlice.reducer;
