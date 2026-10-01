/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Drug {
  id?: string;
  drugName?: string;
  /** @format int32 */
  price?: number;
  sellerId?: string;
  sellerName?: string;
  isListed?: boolean;
}

export interface Weaponry {
  id?: string;
  name?: string;
  /** @format int32 */
  price?: number;
  sellerId?: string;
  sellerName?: string;
  isListed?: boolean;
}

export interface StolenArtifact {
  id?: string;
  name?: string;
  /** @format int32 */
  price?: number;
  sellerId?: string;
  sellerName?: string;
  isListed?: boolean;
}

export interface DrugControllerQueriesPostDrugParams {
  Id?: string;
  drugName?: string;
  /** @format int32 */
  price?: number;
  sellerId?: string;
  sellerName?: string;
  isListed?: boolean;
}

export interface DrugControllerQueriesDeleteDrugParams {
  drugId?: string;
}

export interface FbiQueriesDeleteVendorAndVendorProductsParams {
  sellerId?: string;
}

export interface InventoryQueriesAddDrugToInventoryParams {
  drugId?: string;
}

export interface InventoryQueriesAddWeaponryToInventoryParams {
  weaponryId?: string;
}

export interface InventoryQueriesAddStolenArtifactToInventoryParams {
  stolenArtifactId?: string;
}

export interface StolenArtifactQueriesPostStolenArtifactParams {
  Id?: string;
  name?: string;
  /** @format int32 */
  price?: number;
  sellerId?: string;
  sellerName?: string;
  isListed?: boolean;
}

export interface StolenArtifactQueriesDeleteStolenArtifactParams {
  stolenArtifactId?: string;
}

export interface WeaponryQueriesPostWeaponryParams {
  Id?: string;
  name?: string;
  /** @format int32 */
  price?: number;
  sellerId?: string;
  sellerName?: string;
  isListed?: boolean;
}

export interface WeaponryQueriesDeleteWeaponryParams {
  weaponryId?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:5000";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data.data;
    });
  };
}

/**
 * @title My Title
 * @version 1.0.0
 * @baseUrl http://localhost:5000
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  getAllMyDrugs = {
    /**
     * No description
     *
     * @tags DrugControllerQueries
     * @name DrugControllerQueriesGetAllMyDrugs
     * @request GET:/GetAllMyDrugs
     */
    drugControllerQueriesGetAllMyDrugs: (params: RequestParams = {}) =>
      this.request<Drug[], any>({
        path: `/GetAllMyDrugs`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  postDrug = {
    /**
     * No description
     *
     * @tags DrugControllerQueries
     * @name DrugControllerQueriesPostDrug
     * @request POST:/PostDrug
     */
    drugControllerQueriesPostDrug: (
      query: DrugControllerQueriesPostDrugParams = {},
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/PostDrug`,
        method: "POST",
        query: query,
        ...params,
      }),
  };
  deleteDrug = {
    /**
     * No description
     *
     * @tags DrugControllerQueries
     * @name DrugControllerQueriesDeleteDrug
     * @request DELETE:/DeleteDrug
     */
    drugControllerQueriesDeleteDrug: (
      query: DrugControllerQueriesDeleteDrugParams = {},
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/DeleteDrug`,
        method: "DELETE",
        query: query,
        ...params,
      }),
  };
  deleteVendorAndVendorProducts = {
    /**
     * No description
     *
     * @tags FBIQueries
     * @name FbiQueriesDeleteVendorAndVendorProducts
     * @request DELETE:/DeleteVendorAndVendorProducts
     */
    fbiQueriesDeleteVendorAndVendorProducts: (
      query: FbiQueriesDeleteVendorAndVendorProductsParams = {},
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/DeleteVendorAndVendorProducts`,
        method: "DELETE",
        query: query,
        ...params,
      }),
  };
  getDrugsInInventory = {
    /**
     * No description
     *
     * @tags InventoryQueries
     * @name InventoryQueriesGetDrugsInInventory
     * @request GET:/getDrugsInInventory
     */
    inventoryQueriesGetDrugsInInventory: (params: RequestParams = {}) =>
      this.request<Drug[], any>({
        path: `/getDrugsInInventory`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  addDrugToInventory = {
    /**
     * No description
     *
     * @tags InventoryQueries
     * @name InventoryQueriesAddDrugToInventory
     * @request POST:/addDrugToInventory
     */
    inventoryQueriesAddDrugToInventory: (
      query: InventoryQueriesAddDrugToInventoryParams = {},
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/addDrugToInventory`,
        method: "POST",
        query: query,
        format: "json",
        ...params,
      }),
  };
  getWeaponryInInventory = {
    /**
     * No description
     *
     * @tags InventoryQueries
     * @name InventoryQueriesGetWeaponryInInventory
     * @request GET:/getWeaponryInInventory
     */
    inventoryQueriesGetWeaponryInInventory: (params: RequestParams = {}) =>
      this.request<Weaponry[], any>({
        path: `/getWeaponryInInventory`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  addWeaponryToInventory = {
    /**
     * No description
     *
     * @tags InventoryQueries
     * @name InventoryQueriesAddWeaponryToInventory
     * @request POST:/addWeaponryToInventory
     */
    inventoryQueriesAddWeaponryToInventory: (
      query: InventoryQueriesAddWeaponryToInventoryParams = {},
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/addWeaponryToInventory`,
        method: "POST",
        query: query,
        format: "json",
        ...params,
      }),
  };
  getStolenArtifactsInInventory = {
    /**
     * No description
     *
     * @tags InventoryQueries
     * @name InventoryQueriesGetStolenArtifactsInInventory
     * @request GET:/getStolenArtifactsInInventory
     */
    inventoryQueriesGetStolenArtifactsInInventory: (
      params: RequestParams = {},
    ) =>
      this.request<StolenArtifact[], any>({
        path: `/getStolenArtifactsInInventory`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  addStolenArtifactToInventory = {
    /**
     * No description
     *
     * @tags InventoryQueries
     * @name InventoryQueriesAddStolenArtifactToInventory
     * @request POST:/addStolenArtifactToInventory
     */
    inventoryQueriesAddStolenArtifactToInventory: (
      query: InventoryQueriesAddStolenArtifactToInventoryParams = {},
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/addStolenArtifactToInventory`,
        method: "POST",
        query: query,
        format: "json",
        ...params,
      }),
  };
  getAllMyStolenArtifacts = {
    /**
     * No description
     *
     * @tags StolenArtifactQueries
     * @name StolenArtifactQueriesGetAllMyStolenArtifacts
     * @request GET:/GetAllMyStolenArtifacts
     */
    stolenArtifactQueriesGetAllMyStolenArtifacts: (
      params: RequestParams = {},
    ) =>
      this.request<StolenArtifact[], any>({
        path: `/GetAllMyStolenArtifacts`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  postStolenArtifact = {
    /**
     * No description
     *
     * @tags StolenArtifactQueries
     * @name StolenArtifactQueriesPostStolenArtifact
     * @request POST:/PostStolenArtifact
     */
    stolenArtifactQueriesPostStolenArtifact: (
      query: StolenArtifactQueriesPostStolenArtifactParams = {},
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/PostStolenArtifact`,
        method: "POST",
        query: query,
        ...params,
      }),
  };
  deleteStolenArtifact = {
    /**
     * No description
     *
     * @tags StolenArtifactQueries
     * @name StolenArtifactQueriesDeleteStolenArtifact
     * @request DELETE:/DeleteStolenArtifact
     */
    stolenArtifactQueriesDeleteStolenArtifact: (
      query: StolenArtifactQueriesDeleteStolenArtifactParams = {},
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/DeleteStolenArtifact`,
        method: "DELETE",
        query: query,
        ...params,
      }),
  };
  getAllMyWeaponry = {
    /**
     * No description
     *
     * @tags WeaponryQueries
     * @name WeaponryQueriesGetAllMyWeaponry
     * @request GET:/GetAllMyWeaponry
     */
    weaponryQueriesGetAllMyWeaponry: (params: RequestParams = {}) =>
      this.request<Weaponry[], any>({
        path: `/GetAllMyWeaponry`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  postWeaponry = {
    /**
     * No description
     *
     * @tags WeaponryQueries
     * @name WeaponryQueriesPostWeaponry
     * @request POST:/PostWeaponry
     */
    weaponryQueriesPostWeaponry: (
      query: WeaponryQueriesPostWeaponryParams = {},
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/PostWeaponry`,
        method: "POST",
        query: query,
        ...params,
      }),
  };
  deleteWeaponry = {
    /**
     * No description
     *
     * @tags WeaponryQueries
     * @name WeaponryQueriesDeleteWeaponry
     * @request DELETE:/DeleteWeaponry
     */
    weaponryQueriesDeleteWeaponry: (
      query: WeaponryQueriesDeleteWeaponryParams = {},
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/DeleteWeaponry`,
        method: "DELETE",
        query: query,
        ...params,
      }),
  };
}
