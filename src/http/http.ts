import Axios from "axios";
import { applyAuthInterceptor } from "./auth-interceptor";
import { ENV_KEYS } from "#/lib/env-keys";

const baseURL = ENV_KEYS.API_URL;

export const internalAxios = Axios.create({
  baseURL,
});

applyAuthInterceptor(internalAxios);
