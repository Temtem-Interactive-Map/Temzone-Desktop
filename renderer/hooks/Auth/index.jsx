import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { auth } from "services";

export function useAuth() {
  // Internationalization
  const { t } = useTranslation();

  const login = useCallback(
    (email, password) =>
      signInWithEmailAndPassword(auth, email, password).catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
          case "auth/wrong-password":
            error.code = 400;
            error.message = t("error.login");

            break;
          case "auth/network-request-failed":
            error.code = "ERR_NETWORK";
            error.message = t("error.network");

            break;
          default:
            error.code = "ERR_UNAVAILABLE";
            error.message = t("error.unavailable");

            break;
        }

        throw error;
      }),
    [t]
  );

  const logout = useCallback(() => signOut(auth), []);

  return {
    login,
    logout,
  };
}
