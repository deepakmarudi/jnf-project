import { buildApiUrl } from "@/lib/api-client";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/api";
import { getSession } from "next-auth/react";

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];
export type JsonObject = { [key: string]: JsonValue };

type FetchJsonOptions = Omit<RequestInit, "body"> & {
  body?: JsonObject | FormData;
};

export async function fetchJson<TData>(
  path: string,
  options: FetchJsonOptions = {}
): Promise<ApiSuccessResponse<TData>> {
  const { body, headers, ...restOptions } = options;
  const session = await getSession();
  const token = session?.user?.accessToken;
  console.log("FETCH JSON BEADER TOKEN IS:", token);

  let response: Response;

  try {
    const isFormData = body instanceof FormData;
    response = await fetch(buildApiUrl(path), {
      ...restOptions,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      cache: "no-store",
      body: isFormData ? body : (body ? JSON.stringify(body) : undefined),
    });
  } catch (error) {
    throw {
      message:
        error instanceof Error
          ? error.message
          : "Unable to reach the API server.",
    } satisfies ApiErrorResponse;
  }

  let responseJson:
    | (ApiErrorResponse & {
        error?: {
          message?: string;
          details?: Record<string, unknown>;
        };
      })
    | ApiSuccessResponse<TData>
    | null = null;

  try {
    responseJson = (await response.json()) as
      | ApiSuccessResponse<TData>
      | ApiErrorResponse;
  } catch {
    responseJson = null;
  }

  if (!response.ok) {
    if (responseJson?.message) {
      throw responseJson;
    }

    const errJson = responseJson as ApiErrorResponse & {
      error?: { message?: string; details?: Record<string, unknown> };
    };

    if (errJson?.error?.message) {
      throw {
        message: errJson.error.message,
        errors:
          errJson.error.details && typeof errJson.error.details === "object"
            ? (errJson.error.details as Record<string, string[]>)
            : undefined,
      } satisfies ApiErrorResponse;
    }

    throw {
      message: `Request failed with status ${response.status}.`,
    } satisfies ApiErrorResponse;
  }

  if (!responseJson) {
    return {
      data: undefined as TData,
    };
  }

  return responseJson as ApiSuccessResponse<TData>;
}
