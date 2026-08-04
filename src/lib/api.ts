import { getToken, clearAuth, isTokenExpired } from "./auth";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5000/api/v1";

class ApiClient {
  private readonly timeout = 30000;

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, this.timeout);

    try {
      const headers = new Headers(options.headers ?? {});

      const token = getToken();

      if (token && isTokenExpired(token)) {
        clearAuth();

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        throw new Error("Session expired");
      }

      if (token) {
        headers.set(
          "Authorization",
          `Bearer ${token}`
        );
      }

      if (!(options.body instanceof FormData)) {
        headers.set(
          "Content-Type",
          "application/json"
        );
      }

      const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
          ...options,
          headers,
          signal: controller.signal,
        }
      );

      const contentType =
        response.headers.get("content-type");

      const data =
        contentType?.includes(
          "application/json"
        )
          ? await response.json()
          : await response.text();

      if (response.status === 401) {
        const token = getToken();

        if (token) {
          clearAuth();

          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        }
      }

      if (!response.ok) {
        throw new Error(
          data?.message ??
          `HTTP ${response.status}`
        );
      }

      return data as T;
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(
          "Request timed out."
        );
      }

      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: "GET",
    });
  }

  post<T>(
    endpoint: string,
    body?: unknown
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body:
        body instanceof FormData
          ? body
          : JSON.stringify(body),
    });
  }

  put<T>(
    endpoint: string,
    body?: unknown
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body:
        body instanceof FormData
          ? body
          : JSON.stringify(body),
    });
  }

  patch<T>(
    endpoint: string,
    body?: unknown
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body:
        body instanceof FormData
          ? body
          : JSON.stringify(body),
    });
  }

  delete<T>(
    endpoint: string
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: "DELETE",
    });
  }

  upload<T>(
    endpoint: string,
    formData: FormData
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: formData,
    });
  }
}

const api = new ApiClient();

export default api;
export { ApiClient };