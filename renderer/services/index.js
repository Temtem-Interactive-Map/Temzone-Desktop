import axios from "axios";

export function login(email, password) {
  return new Promise((resolve, _reject) => setTimeout(() => resolve(), 0));
}

export function logout() {
  return new Promise((resolve, _reject) => setTimeout(() => resolve(), 0));
}

const temzoneApi = axios.create({
  baseURL: process.env.TEMZONE_BASE_URL,
});

export const Type = Object.freeze({
  Temtem: "temtem",
  Saipark: "saipark",
  Landmark: "landmark",
});

export function getMarkers(types) {
  // TODO: remove this line with the test endpoint
  types = [];

  return temzoneApi
    .get("/markers", {
      params: { type: types.join(",") },
    })
    .then((response) => response.data);
}

export function updateTemtemMarker(marker) {
  return temzoneApi
    .put("/markers/" + marker.id + "/temtem", {
      data: marker,
    })
    .then((response) => response.data);
}

export function updateSaiparkMarker(marker) {
  return temzoneApi
    .put("/markers/" + marker.id + "/saipark", {
      data: marker,
    })
    .then((response) => response.data);
}

export function updateLandmarkMarker(marker) {
  return temzoneApi
    .put("/markers/" + marker.id + "/landmark", {
      data: marker,
    })
    .then((response) => response.data);
}
