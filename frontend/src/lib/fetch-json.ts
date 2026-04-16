import { buildApiUrl } from "@/lib/api-client";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/api";
import { getSession } from "next-auth/react";

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
  const session = await getSession();
  const token = session?.user?.accessToken;

  const response = await fetch(buildApiUrl(path), {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let responseJson:
    | ApiSuccessResponse<TData>
    | ApiErrorResponse
    | null = null;

  try {
    responseJson = (await response.json()) as
      | ApiSuccessResponse<TData>
      | ApiErrorResponse;
  } catch {
    responseJson = null;
  }

  if (!response.ok) {
    throw (
      responseJson ?? {
        message: "Something went wrong while contacting the server.",
      }
    );
  }

  if (!responseJson) {
    return {
      data: undefined as TData,
    };
  }

  return responseJson as ApiSuccessResponse<TData>;
}
