import { buildApiUrl } from "@/lib/api-client";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/api";

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonObject | JsonValue[];
type JsonObject = { [key: string]: JsonValue };

type FetchJsonOptions = Omit<RequestInit, "body"> & {
  body?: JsonObject;
};

export async function fetchJson<TData>(
  path: string,
  options: FetchJsonOptions = {}
): Promise<ApiSuccessResponse<TData>> {
  const { body, headers, ...restOptions } = options;

  const response = await fetch(buildApiUrl(path), {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const responseJson = (await response.json()) as
    | ApiSuccessResponse<TData>
    | ApiErrorResponse;

  if (!response.ok) {
    throw responseJson;
  }

  return responseJson as ApiSuccessResponse<TData>;
}
