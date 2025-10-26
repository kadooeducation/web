import { Either, left, right } from "@/infra/shared/utils/either";
import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";
import { HttpClient } from "../http-client";

export class AxiosAdapterServer implements HttpClient {
  private readonly api: AxiosInstance;

  constructor () {
    const token = cookies()?.get(process.env.NEXT_PUBLIC_TOKEN_NAME!)?.value;

    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : {},
    });
  }

  private handleError(error: unknown): Either<Error, never> {
    const message =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : 'Ocorreu um erro interno.';
    return left(new Error(message));
  }

  async get<Result>(url: string, params?: object): Promise<Either<Error, Result>> {
    try {
      const { data } = await this.api.get<Result>(url, { params });
      return right(data);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async post<Result>(url: string, body: object): Promise<Either<Error, Result>> {
    try {
      const { data } = await this.api.post<Result>(url, body);
      return right(data);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async put<Result>(url: string, body: object): Promise<Either<Error, Result>> {
    try {
      const { data } = await this.api.put<Result>(url, body);
      return right(data);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async patch<Result>(url: string, body: object): Promise<Either<Error, Result>> {
    try {
      const { data } = await this.api.patch<Result>(url, body);
      return right(data);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete<Result>(url: string): Promise<Either<Error, Result>> {
    try {
      const { data } = await this.api.delete<Result>(url);
      return right(data);
    } catch (error) {
      return this.handleError(error);
    }
  }
}