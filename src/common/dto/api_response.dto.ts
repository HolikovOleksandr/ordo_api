export class ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: unknown;

  constructor(partial: Partial<ApiResponse<T>>) {
    Object.assign(this, partial);
  }
}
