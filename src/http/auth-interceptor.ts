import { ENV_KEYS, STORAGE_KEYS } from "#/data";
import { getCookie } from "#/lib/appCookie";
import { AxiosInstance } from "axios";

export const applyAuthInterceptor = (axiosInstance: AxiosInstance) => {
  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    async (config: any) => {
      // Get user token
      //   const token = (await getFromStore(STORAGE_KEYS.TOKEN)) || "";
      const token = getCookie(STORAGE_KEYS.AUTH_TOKEN);

      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};
