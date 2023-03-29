import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { t } from "locales";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
});
const auth = getAuth(app);
const temzoneApi = axios.create({
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

export async function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
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
    });
}

export async function logout() {
  return signOut(auth);
}

export async function getMarkers() {
  const responses = await Promise.all(
    [0, 200, 400].map((offset) =>
      temzoneApi.get("/markers", {
        params: new URLSearchParams({
          limit: 200,
          offset,
        }),
      })
    )
  );

  return responses.map((response) => response.items).flat();
}

export async function updateSpawnMarker(id, marker) {
  return temzoneApi.put("/markers/spawns/" + id, {
    subtitle: marker.subtitle,
    condition: marker.condition,
    coordinates: marker.coordinates,
  });
}

export async function updateSaiparkMarker(id, marker) {
  return temzoneApi.put("/markers/saipark/" + id, {
    coordinates: marker.coordinates,
  });
}
