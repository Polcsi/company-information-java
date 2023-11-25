export const BASE_URL = "http://localhost:8080";

export interface APIResponse<T> {
  message: string;
  status: string;
  timestamp: string;
  data: T;
  currentPage: number;
  totalItems: number;
  totalPages: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
