import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FirebaseContext } from "../../context/Firebase";

export const AxiosContext = createContext();

export function AxiosProvider({ children }) {
  // Navigation
  const router = useRouter();

  // Internationalization
  const { t } = useTranslation();

  // Context
  const { auth } = useContext(FirebaseContext);

  // State
  const temzoneApi = useRef();

  useEffect(() => {
    temzoneApi.current = axios.create({
      baseURL: process.env.NEXT_PUBLIC_TEMZONE_BASE_URL,
    });

    temzoneApi.current.interceptors.request.use(async (config) => {
      const user = auth.current.currentUser;

      if (user) {
        const token = await user.getIdToken(true);

        config.headers.Authorization = "Bearer " + token;
      } else {
        router.push("/login");
      }

      return config;
    });

    temzoneApi.current.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.code === "ERR_NETWORK") {
          error.message = t("error.network");
        }

        throw error;
      }
    );
  }, [auth, router, t]);

  return (
    <AxiosContext.Provider value={{ temzoneApi }}>
      {children}
    </AxiosContext.Provider>
  );
}
