import axios from "axios";

interface IOptions {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  endPoint: string;
  data?: any;
}
// export const baseURL = "http://192.168.0.109:2854/api/v1";
export const baseURL = "https://back-production-6491.up.railway.app/api/v1";
export const useApi = () => {
  const httpClient = async ({ method, endPoint, data }: IOptions) => {
    const token = localStorage.getItem("token") ?? "";

    try {
      const response = await axios({
        url: `${baseURL}/${endPoint}`,
        data,
        method,
        headers: {
          ["authorization"]: token,
        },
      });
      return response.data;
    } catch (err: any) {
      // If it's an axios error we can inspect response
      if (axios.isAxiosError(err)) {
        const status = err?.response?.status;
        const serverData = err?.response?.data;
        const serverMessage =
          serverData?.message ??
          serverData?.error ??
          err?.message ??
          "Request failed";

        // return a normalized failure object (or throw)
        return Promise.reject({
          isApiError: true,
          status,
          data: serverData ?? "",
          message: serverMessage ?? "",
        });
      }

      return Promise.reject(err);
    }
  };

  const updateTenant = async (data: any, tenantId: string) => {
    return httpClient({
      endPoint: `tenant/update/${tenantId}`,
      method: "PUT",
      data,
    });
  };

  return {};
};
