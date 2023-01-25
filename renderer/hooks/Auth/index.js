import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { t } from "locales";
import { useCallback } from "react";
import { auth } from "services";

export function useAuth() {
  const login = useCallback(
    (email, password) =>
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const tokenResult = await userCredential.user.getIdTokenResult();

          if (tokenResult.claims.admin) {
            return userCredential;
          } else {
            const error = new Error();
            error.code = "auth/wrong-password";

            throw error;
          }
        })
        .catch((error) => {
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
    []
  );

  const logout = useCallback(() => signOut(auth), []);

  return {
    login,
    logout,
  };
}
