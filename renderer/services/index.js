import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { t } from "locales";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
});

export const auth = getAuth(app);
export const temzoneApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TEMZONE_BASE_URL,
});

temzoneApi.interceptors.request.use(async (config) => {
  try {
    const user = auth.currentUser;
    const token = await user.getIdToken();

    config.headers.Authorization = "Bearer " + token;

    return config;
  } catch (error) {
    if (error.code === "auth/network-request-failed") {
      throw new Error(t("error.network"));
    } else {
      throw new Error(t("error.unavailable"));
    }
  }
});

temzoneApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.code === "ERR_NETWORK") {
      error.message = t("error.network");
    } else if (error.code === 500) {
      error.message = t("error.unavailable");
    }

    throw error;
  }
);
