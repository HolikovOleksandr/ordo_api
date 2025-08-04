export class ApiResponseDto<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: unknown;

  constructor(partial: Partial<ApiResponseDto<T>>) {
    Object.assign(this, partial);
  }
}
