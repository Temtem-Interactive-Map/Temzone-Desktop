import axios from "axios";
import { t } from "i18next";

export function login(email, password) {
  return new Promise((resolve, _reject) => resolve());
}

export function logout() {
  return new Promise((resolve, _reject) => resolve());
}

const token = "test";
const temzoneApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TEMZONE_BASE_URL,
  headers: { Authorization: "Bearer " + token },
});

temzoneApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.code === "ERR_NETWORK") {
      error.message = t("error.network");
    }

    throw error;
  }
);

export const Type = Object.freeze({
  Temtem: "temtem",
  Saipark: "saipark",
  Landmark: "landmark",
});

export function getMarkers(types) {
  return temzoneApi
    .get("/markers", {
      params: { type: types.join(",") },
    })
    .then((markers) =>
      [
        {
          id: -1,
          type: "temtem",
          title: "Chromeon",
          subtitle: {
            original: "Iwaba, East Path",
            current: "Iwaba, East Path",
          },
          condition: null,
          coordinates: null,
        },
        {
          id: 0,
          type: "temtem",
          title: "Chromeon Digital",
          subtitle: {
            original: "Iwaba, East Path",
            current: "Iwaba, East Path",
          },
          condition: null,
          coordinates: null,
        },
        {
          id: 1,
          type: "temtem",
          title: "Mimit",
          subtitle: {
            original: "Iwaba, East Path",
            current: "Iwaba, East Path",
          },
          condition: "Requires Fishing Rod",
          coordinates: {
            x: 8192,
            y: 7692,
          },
        },
        {
          id: 2,
          type: "saipark",
          title: "Saipark",
          subtitle: "West from Praise Coast",
          coordinates: {
            x: 8692,
            y: 8192,
          },
        },
        {
          id: 3,
          type: "landmark",
          title: "Zadar",
          subtitle: "South of Praise Coast",
          coordinates: {
            x: 7692,
            y: 8192,
          },
        },
        {
          id: 4,
          type: "landmark",
          title: "Zadar",
          subtitle: null,
          coordinates: null,
        },
      ].filter((marker) => types.includes(marker.type))
    );
}

export function updateTemtemMarker(id, marker) {
  return temzoneApi.put("/markers/" + id + "/temtem", {
    data: marker,
  });
}

export function updateSaiparkMarker(id, marker) {
  return temzoneApi.put("/markers/" + id + "/saipark", {
    data: marker,
  });
}

export function updateLandmarkMarker(id, marker) {
  return temzoneApi.put("/markers/" + id + "/landmark", {
    data: marker,
  });
}
