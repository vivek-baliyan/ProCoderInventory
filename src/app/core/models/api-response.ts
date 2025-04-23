export interface ApiResponse<T> {
  success: boolean;
  data: T;
  errors: ApiError[];
  message: string;
}

export interface ApiError {
  code: string;
  description: string;
}
