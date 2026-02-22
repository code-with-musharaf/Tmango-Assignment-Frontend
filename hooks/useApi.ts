import axios from "axios";

interface IOptions {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  endPoint: string;
  data?: any;
}

export const baseURL =
  "https://pretty-harmony-production-f2d6.up.railway.app/api";
// export const baseURL = "http://192.168.0.107:8080/api";
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
      if (axios.isAxiosError(err)) {
        const status = err?.response?.status;
        const serverData = err?.response?.data;
        const serverMessage =
          serverData?.message ??
          serverData?.error ??
          err?.message ??
          "Request failed";

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

  const login = async (data: { name: string; email: string }) => {
    return httpClient({
      endPoint: "auth",
      method: "POST",
      data,
    });
  };

  const getAllSubmission = async () => {
    const challengeId = `699989ed6c01db1dbc3fe6d4`;
    return httpClient({
      endPoint: `challenge/submission/${challengeId}`,
      method: "GET",
    });
  };

  const cheChallengeJoinedOrnot = async () => {
    const challengeId = `699989ed6c01db1dbc3fe6d4`;
    return httpClient({
      endPoint: `challenge/joined/${challengeId}`,
      method: "GET",
    });
  };

  const requestToJoinChallenge = async () => {
    const challengeId = `699989ed6c01db1dbc3fe6d4`;
    return httpClient({
      endPoint: `challenge/${challengeId}/join`,
      method: "POST",
    });
  };

  const getSubmisionOfTheDay = async (dayCount: number) => {
    const challengeId = `699989ed6c01db1dbc3fe6d4`;
    return httpClient({
      endPoint: `challenge/submission/${challengeId}/${dayCount}`,
      method: "GET",
    });
  };

  const submitCheckin = async (data: any) => {
    const challengeId = `699989ed6c01db1dbc3fe6d4`;
    return httpClient({
      endPoint: `challenge/submission/${challengeId}`,
      method: "POST",
      data,
    });
  };
  return {
    login,
    getAllSubmission,
    cheChallengeJoinedOrnot,
    requestToJoinChallenge,
    getSubmisionOfTheDay,
    submitCheckin,
  };
};
