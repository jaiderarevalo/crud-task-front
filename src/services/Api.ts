import { AxiosBasicCredentials } from "axios";
import { convertToDataItems, makeDataFormData } from "./api-utils";
import { Axios } from "./axios";
interface ApiCallOptions {
  headers?: Record<string, string>;
  auth?: "bearer" | "basic";
  authToken?: string;
  username?: string;
  password?: string;
  query?: Record<string, string | number | boolean>;
}

interface ApiCallOption {
  headers?: Record<string, string>;
  auth?: AxiosBasicCredentials | undefined;
  query?: Record<string, string | number | boolean>;
}
export type TypePostData = {
  name: string;
  value: string | boolean;
};

export class Api {
  static baseUrl = "http://localhost:3900/api";

  static async get<T>(
    url: string,
    options?: ApiCallOptions
  ): Promise<{
    statusCode: number;
    data: T;
  }> {
    const response = await Axios.get(Api.buildUrl(url, options?.query), {
      headers: await this.buildHeaders(),
    });
    return {
      statusCode: response.status,
      data: response.data,
    };
  }

  static async getOneTask(url: string, options?: ApiCallOption ) {
    const response = await Axios.get(url, options);
    return response.data;
  }

  static async post<T>(
    url: string,
    body?: TypePostData | object,
    options?: ApiCallOptions,
    isFormData?: boolean
  ): Promise<{
    statusCode: number;
    data: T;
  }> {
    const data = convertToDataItems(body as any);
    const formData = makeDataFormData(data);

    const headers = await this.buildHeaders(isFormData);

    const response = await Axios.post(Api.buildUrl(url), formData, {
      headers,
    });

    return {
      statusCode: response.status,
      data: response.data,
    };
  }

  static async patch<T>(
    url: string,
    body: any,
    options?: ApiCallOptions,
    isFormData?: boolean
  ): Promise<any> {
    const data = convertToDataItems(body as any);
    const formData = makeDataFormData(data);
    const headers = await this.buildHeaders(isFormData);
    const response = await Axios.patch(Api.buildUrl(url), formData, {
      headers,
    });
    return {
      statusCode: response.status,
      data: response.data,
    };
  }

  static async put<T>(
    url: string,
    body: any,
    isFormData?: boolean
  ): Promise<any> {
    const data = convertToDataItems(body as any);
    const formData = makeDataFormData(data);
    const headers = await this.buildHeaders(isFormData);

    const response = await Axios.put(this.buildUrl(url), formData, {
      headers: headers,
    });

    return {
      statusCode: response.status,
      data: response.data,
    };
  }

  static async delete<T>(url: string, options?: ApiCallOptions): Promise<T> {
    const response = await Axios.delete(Api.buildUrl(url), {
      headers: await Api.buildHeaders(false),
    });

    return response.data;
  }

  static buildUrl(
    url: string,
    query?: Record<string, string | number | boolean>
  ): string {
    const queryString = query
      ? `?${new URLSearchParams(query as any).toString()}`
      : "";
    return `${Api.baseUrl}${url}${queryString}`;
  }

  static async buildHeaders(
    isFormData?: boolean
  ): Promise<Record<string, string>> {
    const headers: Record<string, string> = isFormData
      ? {
          "Content-Type": "multipart/form-data",
        }
      : {
          "Content-Type": "application/json",
        };

    const token = window.localStorage.getItem("token");

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }
}
