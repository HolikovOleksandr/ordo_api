export class ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any;

  constructor(partial: Partial<ApiResponse<T>>) {
    Object.assign(this, partial);
  }
}
