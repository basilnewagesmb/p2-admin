import { getSession } from "next-auth/react";
import { auth as serverAuth } from "@/auth";

export interface QueryParams {
  offset?: number;
  limit?: number;
  sort?: string[][] | { [key: string]: 1 | -1 };
  where?: any;
  filters?: any;
  select?: string[];
  populate?: string[];
  search?: string;
  data?: {
    [key: string]: any;
  };
}

export interface ApiResponse {
  data?: any;
  error?: any;
  message?: any;
  statusCode?: number;
  count?: number;
}

export interface HttpOptions {
  auth?: boolean;
  additionalHeaders?: any;
  isMultipart?: boolean;
}

const getHttpOption = async (options: HttpOptions): Promise<Headers> => {
  const { auth = true, additionalHeaders, isMultipart } = options;
  const headers: HeadersInit = new Headers();
  headers.set("Content-Type", "application/json");
  if (additionalHeaders && Object.keys(additionalHeaders).length) {
    for (const key in additionalHeaders) {
      headers.set(key, additionalHeaders[key]);
    }
  }
  if (!!isMultipart) headers.set("Content-Type", "multipart/form-data;");
  if (!!auth) {
    const session =
      typeof window === "undefined" ? await serverAuth() : await getSession();
    if (!!session) {
      headers.set("Authorization", `Bearer ${session?.user?.accessToken}`);
    }
  }
  return headers;
};

const convertFilterToWhere = (filters: any) => {
  const where: { [key: string]: any } = { ...filters };
  for (const key in where) {
    if (Object.prototype.hasOwnProperty.call(where, key)) {
      if (where[key] === undefined || where[key] === null) {
        delete where[key];
        continue;
      }
      if (typeof where[key] === "object") {
        if (Array.isArray(where[key])) {
          continue;
        }
        where[key] = convertFilterToWhere(where[key]);
        if (Object.entries(where[key]).length === 0) {
          delete where[key];
        }
      }
    }
  }
  return where;
};

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

const generateQueryUrl = (path: string, options?: QueryParams): string => {
  let url = `${API_ENDPOINT}${path}${options ? "?" : ""}`;

  if (typeof options === "undefined") {
    return url;
  }
  if (!isNaN(Number(options.limit))) {
    url += "limit=" + options.limit + "&";
  }
  if (!isNaN(Number(options.offset))) {
    url += "offset=" + options.offset + "&";
  }
  if (options.search) {
    url += "search=" + options.search + "&";
  }
  if (options.sort && Array.isArray(options.sort)) {
    url += "sort=" + JSON.stringify(options.sort) + "&";
  }
  if (options.where && typeof options.where === "object") {
    url += "where=" + JSON.stringify(options.where) + "&";
  } else if (options.filters && typeof options.filters === "object") {
    url +=
      "where=" + JSON.stringify(convertFilterToWhere(options.filters)) + "&";
  }
  if (options.select && Array.isArray(options.select)) {
    url += "select=" + JSON.stringify(options.select) + "&";
  }
  if (options.populate && Array.isArray(options.populate)) {
    url += "populate=" + JSON.stringify(options.populate) + "&";
  }
  if (options.data && typeof options.data === "object") {
    for (const key in options.data) {
      if (Object.prototype.hasOwnProperty.call(options.data, key)) {
        url += `${key}=${options.data[key]}&`;
      }
    }
  }
  return url.slice(0, -1);
};

const errorHandler = (error: any): any => {
  return { error, message: error.message || "error" };
};

/**
 * fetchMe
 * @param queryParams
 * @param options
 */
const Me = async (
  queryParams?: QueryParams,
  options?: HttpOptions,
  requestInit?: RequestInit
): Promise<ApiResponse> => {
  try {
    const response = await fetch(generateQueryUrl("user/me", queryParams), {
      method: "GET",
      headers: await getHttpOption(options || {}),
      ...requestInit,
    });
    return response.json();
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * fetchUpdateMe
 * @param body
 * @param queryParams
 * @param options
 */
const UpdateMe = async (
  body: any,
  queryParams?: QueryParams,
  options?: HttpOptions,
  requestInit?: RequestInit
): Promise<ApiResponse> => {
  try {
    const response = await fetch(generateQueryUrl("user/me", queryParams), {
      method: "PUT",
      body: JSON.stringify(body),
      headers: await getHttpOption(options || {}),
      ...requestInit,
    });
    return response.json();
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * fetchGetAll
 *
 * @param entity
 * @param queryParams
 * @param options
 */
const GetAll = async (
  entity: string,
  queryParams?: QueryParams,
  options?: HttpOptions,
  requestInit?: RequestInit
): Promise<ApiResponse> => {
  try {
    const response = await fetch(generateQueryUrl(entity, queryParams), {
      method: "GET",
      headers: await getHttpOption(options || {}),
      ...requestInit,
    });
    return response.json();
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * fetchGetById
 *
 * @param entity
 * @param id
 * @param queryParams
 * @param options
 */
const GetById = async (
  entity: string,
  id: number | string,
  queryParams?: QueryParams,
  options?: HttpOptions,
  requestInit?: RequestInit
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      generateQueryUrl(`${entity}/${id}`, queryParams),
      {
        method: "GET",
        headers: await getHttpOption(options || {}),
        ...requestInit,
      }
    );
    return response.json();
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * fetchFind
 *
 * @param entity
 * @param queryParams
 * @param options
 */
const Find = async (
  entity: string,
  queryParams?: QueryParams,
  options?: HttpOptions,
  requestInit?: RequestInit
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      generateQueryUrl(`${entity}/find`, queryParams),
      {
        method: "GET",
        headers: await getHttpOption(options || {}),
        ...requestInit,
      }
    );
    return response.json();
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * fetchGetCount
 *
 * @param entity
 * @param queryParams
 * @param options
 */
const GetCount = async (
  entity: string,
  queryParams?: QueryParams,
  options?: HttpOptions,
  requestInit?: RequestInit
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      generateQueryUrl(`${entity}/count`, queryParams),
      {
        method: "GET",
        headers: await getHttpOption(options || {}),
        ...requestInit,
      }
    );
    return response.json();
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * fetchCreate
 *
 * @param entity
 * @param body
 * @param queryParams
 * @param options
 */
const Create = async (
  entity: string,
  body?: any,
  queryParams?: QueryParams,
  options?: HttpOptions,
  requestInit?: RequestInit
): Promise<ApiResponse> => {
  try {
    const response = await fetch(generateQueryUrl(entity, queryParams), {
      method: "POST",
      body: JSON.stringify(body),
      headers: await getHttpOption(options || {}),
      ...requestInit,
    });
    return response.json();
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * fetchUpdateById
 *
 * @param entity
 * @param id
 * @param body
 * @param queryParams
 * @param options
 */
const UpdateById = async (
  entity: string,
  id: number | string,
  body: any,
  queryParams?: QueryParams,
  options?: HttpOptions,
  requestInit?: RequestInit
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      generateQueryUrl(`${entity}/${id}`, queryParams),
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: await getHttpOption(options || {}),
        ...requestInit,
      }
    );
    return response.json();
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * fetchDeleteById
 *
 * @param entity
 * @param id
 * @param queryParams
 * @param options
 */
const DeleteById = async (
  entity: string,
  id: number | string,
  queryParams?: QueryParams,
  options?: HttpOptions,
  requestInit?: RequestInit
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      generateQueryUrl(`${entity}/${id}`, queryParams),
      {
        method: "DELETE",
        headers: await getHttpOption(options || {}),
        ...requestInit,
      }
    );
    return response.json();
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * fetchGet
 *
 * @param entity
 * @param body
 * @param queryParams
 * @param options
 */
const Get = async (
  entity: string,
  queryParams?: QueryParams,
  options?: HttpOptions,
  requestInit?: RequestInit
): Promise<ApiResponse> => {
  try {
    const response = await fetch(generateQueryUrl(entity, queryParams), {
      method: "GET",
      headers: await getHttpOption(options || {}),
      ...requestInit,
    });
    return response.json();
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * fetchPost
 *
 * @param entity
 * @param body
 * @param queryParams
 * @param options
 */
const Post = async (
  entity: string,
  body: any,
  queryParams?: QueryParams,
  options?: HttpOptions,
  requestInit?: RequestInit
): Promise<ApiResponse> => {
  try {
    const response = await fetch(generateQueryUrl(entity, queryParams), {
      method: "POST",
      body: JSON.stringify(body),
      headers: await getHttpOption(options || {}),
      ...requestInit,
    });
    // console.dir(await response.json(), { depth: null });
    return response.json();
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * fetchPut
 *
 * @param entity
 * @param body
 * @param queryParams
 * @param options
 */
const Put = async (
  entity: string,
  body: any,
  queryParams?: QueryParams,
  options?: HttpOptions,
  requestInit?: RequestInit
): Promise<ApiResponse> => {
  try {
    const response = await fetch(generateQueryUrl(entity, queryParams), {
      method: "PUT",
      body: JSON.stringify(body),
      headers: await getHttpOption(options || {}),
      ...requestInit,
    });
    // console.dir(await response.json(), { depth: null });

    return response.json();
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * fetchPatch
 *
 * @param entity
 * @param body
 * @param queryParams
 * @param options
 */
const Patch = async (
  entity: string,
  body: any,
  queryParams?: QueryParams,
  options?: HttpOptions,
  requestInit?: RequestInit
): Promise<ApiResponse> => {
  try {
    const response = await fetch(generateQueryUrl(entity, queryParams), {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: await getHttpOption(options || {}),
      ...requestInit,
    });
    return response.json();
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * fetchDelete
 *
 * @param entity
 * @param body
 * @param queryParams
 * @param options
 */
const Delete = async (
  entity: string,
  queryParams?: QueryParams,
  options?: HttpOptions,
  requestInit?: RequestInit
): Promise<ApiResponse> => {
  try {
    const response = await fetch(generateQueryUrl(entity, queryParams), {
      method: "DELETE",
      headers: await getHttpOption(options || {}),
      ...requestInit,
    });
    return response.json();
  } catch (error) {
    return errorHandler(error);
  }
};

export const API = {
  Create,
  Delete,
  DeleteById,
  Find,
  Get,
  GetAll,
  GetById,
  GetCount,
  Me,
  Patch,
  Post,
  Put,
  UpdateById,
  UpdateMe,
  fetch,
};
