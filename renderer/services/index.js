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
  return temzoneApi
    .get("/markers", {
      params: { type: types.join(",") },
    })
    .then((response) => response.data);
}

export function updateTemtemMarker(id, marker) {
  return temzoneApi
    .put("/markers/" + id + "/temtem", {
      data: marker,
    })
    .then((response) => response.data);
}

export function updateSaiparkMarker(id, marker) {
  return temzoneApi
    .put("/markers/" + id + "/saipark", {
      data: marker,
    })
    .then((response) => response.data);
}

export function updateLandmarkMarker(id, marker) {
  return temzoneApi
    .put("/markers/" + id + "/landmark", {
      data: marker,
    })
    .then((response) => response.data);
}
