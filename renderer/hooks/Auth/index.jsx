import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { FirebaseContext } from "../../context/Firebase";

export function useAuth() {
  // Internationalization
  const { t } = useTranslation();

  // Context
  const { auth } = useContext(FirebaseContext);

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
    [auth, t]
  );

  const logout = useCallback(() => signOut(auth), [auth]);

  return {
    login,
    logout,
  };
}
