import { ListParams, ListResponse, Student } from '../models';
import axiosClient from './axiosClient';

const studentApi = {
  getAll: (params: ListParams): Promise<ListResponse<Student>> => {
    const url = '/students';
    return axiosClient.get(url, { params });
  },
  getStudentById: (id: string): Promise<Student> => {
    const url = `/students/${id}`;
    return axiosClient.get(url);
  },
  addStudent: (student: Student): Promise<Student> => {
    const url = '/students';
    return axiosClient.post(url, student);
  },
  removeStudent: (id: string): Promise<any> => {
    const url = `/students/${id}`;
    return axiosClient.delete(url);
  },
  updateStudent: (student: Partial<Student>, id: string): Promise<Student> => {
    const url = `/students/${id}`;
    return axiosClient.patch(url, student);
  },
};

export default studentApi;
