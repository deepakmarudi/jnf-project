export type ApiSuccessResponse<TData> = {
  message?: string;
  data: TData;
  meta?: Record<string, unknown>;
};

export type ApiValidationErrors = Record<string, string[]>;

export type ApiErrorResponse = {
  message: string;
  errors?: ApiValidationErrors;
};
