import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: "/",
});
export async function GetData() {
  const response: AxiosResponse<ResponseType> = await axiosInstance.get(
    "/data.json"
  );
  return response.data;
}

export interface ResponseType {
  success: boolean;
  status: number;
  message: string;
  pagination: Pagination;
  filters: DataFilter[];
  filtersV2: FiltersV2;
  data: Datum[];
}

export interface Datum {
  id: string;
  userId: string;
  companyId: CompanyID;
  roleId: string;
  hireDate: Date;
  designation: string;
  invitationAcceptedAt: Date | null;
  primary: boolean;
  status: boolean;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  avatar: string;
  address: Address;
  user: User;
  role: Role;
  permission: Permission;
}

export interface Address {
  street: string;
  apartment: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export enum CompanyID {
  Clvp9B07O0009Cgt5Fxx93Atw = "clvp9b07o0009cgt5fxx93atw",
}

export interface Permission {
  canUpdateEmail: boolean;
  canReinvite: boolean;
}

export interface Role {
  id: string;
  name: string;
  key: string;
}

export interface User {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  address: Address;
}

export interface DataFilter {
  display: string;
  key: string;
  value: string;
  count: number;
}

export interface FiltersV2 {
  tabs: Tab[];
  filters: FiltersV2Filter[];
}

export interface FiltersV2Filter {
  name: string;
  key: string;
  multiselect: boolean;
  values: ValueElement[];
}

export interface ValueElement {
  name: string;
  key: string;
  value: ValueValue;
}

export interface ValueValue {
  roleKey?: string;
  archived: string;
  status?: string;
}

export interface Tab {
  display: string;
  key: string;
  count: number;
  value: Record<string, unknown>;
}

export interface Pagination {
  current: number;
  next: number;
  prev: null;
  totalCount: number;
  totalPages: number;
  limit: number;
}
