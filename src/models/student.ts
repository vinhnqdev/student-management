export interface Student {
  id?: string | number;
  name: string;
  age: number;
  mark: number;
  gender: "male" | "female";
  createdAt?: number;
  updatedAt?: number;
  city: string;
}
