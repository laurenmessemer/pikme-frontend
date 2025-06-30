/**
 * This file use to call api and gave you responce of that api and it's take following params
 * It takes in an endpoint, data, id, and params, and returns a response
 * @param endpoint - This is the endpoint object that we created in the previous step.
 * @param data - The data to be sent to the server.
 * @param id - The id of the resource you want to fetch.
 * @param params - This is the object that contains the query parameters.
 * passed to the `api` function. It is used to provide a dynamic message that can be displayed in the
 * success toast message. This message can be customized based on the specific API call or response.
 * @returns An object with a data property that has an error property and a data property.
 */
//language
// import { t } from 'i18next'

//componets
// import CustomToster from '../components/common/CustomToster'
import { axiosInstance } from "./apiInterceptors";
import { convertObjToQueryString } from "../utils/RouterUtils";
import { BASE_URLS, DEFAULT_SERVICE_KEY } from "../constant/appConstants";

export const api = async ({
  endpoint,
  payloadData,
  id = null,
  params = null,
  cancelToken = "",
  onUploadProgress = () => {},
}) => {
  let {
    method,
    isMultipart,
    url,
    showToast,
    module = DEFAULT_SERVICE_KEY,
    responseType,
    succesMsgHide,
  } = endpoint;
  let res = null;

  const token = window.localStorage.getItem("token");
  try {
    let obj = {
      data: payloadData,
      method: method,
      headers: {
        "Content-Type": isMultipart
          ? "multipart/form-data"
          : "application/json",
        "ngrok-skip-browser-warning": "true",
      },

      url: `${BASE_URLS.get(module)}${url}${id ? id : ""}${
        params ? convertObjToQueryString(params) : ""
      }`,
    };

    if (method === "GET" && payloadData && typeof payloadData === "string") {
      obj.url += payloadData;
    }
    if (method === "POST") {
      if (!payloadData) payloadData = {};
    }
    if (token) obj.headers["Authorization"] = `Bearer ${token}`;

    if (responseType) {
      obj.responseType = responseType;
    }
    if (cancelToken) {
      obj.cancelToken = cancelToken;
    }
    obj.onUploadProgress = onUploadProgress;
    res = await axiosInstance(obj);
  } catch (err) {
    res = err.response;

    try {
      // showToast && Toast.error(res?.data?.message);

      if (status === 401 || status === 403) {
        url = `${url}/login`;
      }
      return {
        data: {
          error: true,
          data: res?.data?.data,
          errorCode: res?.data?.errorCode,
          error: res?.data?.error,
          message: res.data.message ?? "",
        },
      };
    } catch (error) {
      return {
        data: {
          error: true,
          data: res?.data?.data,
          errorCode: res?.data.errorCode,
          error: res?.data?.error,
          message: res?.data?.message ?? "",
        },
      };
    }
  }

  if (res && res.data && !res.data.error && showToast && !succesMsgHide) {
    // Toast.success(res?.data?.message);
  }
  return res;
};
