import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { toast } from "react-toastify";
import { ENDPOINT } from "../constants/endpoint.contant";
import { logApi } from "../helpers/function.helper";

type TFunction = () => void;
type TUnionFunction = (e: any) => void;

export type ErrorFunctionType = TFunction | TUnionFunction;
export type SuccessFunctionType = TFunction | TUnionFunction;
export type FinallyFunctionType = TFunction;

export const defaultHeaders = {
   "Content-Type": "application/json",
   "Accept": "application/json",
};

export async function get(
   endpoint: string,
   successCallback: SuccessFunctionType = () => {},
   errorCallback: ErrorFunctionType = () => {},
   finallyCallback: FinallyFunctionType = () => {}
) {
   return await myFetch(
      "GET",
      endpoint,
      undefined,
      successCallback,
      errorCallback,
      finallyCallback
   );
}

export async function post(
   endpoint: string,
   body: any,
   successCallback: SuccessFunctionType,
   errorCallback: ErrorFunctionType,
   finallyCallback?: FinallyFunctionType
) {
   return await myFetch("POST", endpoint, body, successCallback, errorCallback, finallyCallback);
}

export function put(
   endpoint: string,
   body: any,
   successCallback: SuccessFunctionType,
   errorCallback: ErrorFunctionType,
   finallyCallback?: FinallyFunctionType
) {
   myFetch("PUT", endpoint, body, successCallback, errorCallback, finallyCallback);
}

export function _delete(
   endpoint: string,
   body: any,
   successCallback: SuccessFunctionType,
   errorCallback: ErrorFunctionType,
   finallyCallback?: FinallyFunctionType
) {
   myFetch("DELETE", endpoint, body, successCallback, errorCallback, finallyCallback);
}

export async function postWithFormData(
   endpoint: string,
   body: any,
   successCallback: SuccessFunctionType,
   errorCallback: ErrorFunctionType,
   finallyCallback?: FinallyFunctionType
) {
   let url = ENDPOINT.BASE + endpoint;

   let headers = {
      "Content-Type": "multipart/form-data",
      "accept": "application/json",
   };

   const config = { headers };

   let response = null;

   try {
      response = await axios.post(url, body, config);
      _handleSuccess(response, successCallback);
   } catch (error) {
      _handleError(error, errorCallback);
   } finally {
      if (!finallyCallback) return;
      finallyCallback();
   }
}

export const alertError = (error: any) => {
   alert(error.code + (error.msg ? ": " + error.msg : ""));
};

async function myFetch(
   method: "GET" | "POST" | "PUT" | "DELETE",
   endpoint: string,
   body: any,
   successCallback: SuccessFunctionType,
   errorCallback: ErrorFunctionType,
   finallyCallback?: FinallyFunctionType
) {
   // let url = AppConfig.API + endpoint;
   let url = endpoint;

   body = JSON.stringify(body);

   const token = ``;

   let headers: RawAxiosRequestHeaders = defaultHeaders;
   headers["Authorization"] = "bearer " + token;
   headers["Accept-Language"] = "en-US,en;q=0.5";

   const config: AxiosRequestConfig = { headers };

   let response = null;

   try {
      switch (method) {
         case "POST":
            response = await axios.post(url, body, config);
            break;
         case "PUT":
            response = await axios.put(url, body, config);
            break;
         case "DELETE":
            response = await axios.delete(url, config);
            break;
         default:
            response = await axios.get(url, config);
            break;
      }
      _handleSuccess(response, successCallback);
      logApi(url, method, body, response);
      return response;
   } catch (error) {
      logApi(url, method, body, error);
      _handleError(error, errorCallback);
      return error;
   } finally {
      if (!finallyCallback) return;
      finallyCallback();
   }
}

const _handleSuccess = (response: any, successCallback: (data: any) => void) => {
   const { data } = response;
   successCallback(data);
};

const _handleError = (error: any, errorCallback: ErrorFunctionType) => {
   const { code, message, response } = error;
   if (code === "ERR_BAD_REQUEST" || code === "ERR_BAD_RESPONSE") {
      errorCallback(response.data);
   } else if (code === "ERR_NETWORK") {
      errorCallback("");
      // logout();
   } else {
      errorCallback("");
      toast.error(() => `${message} [${code}]`);
   }
};
