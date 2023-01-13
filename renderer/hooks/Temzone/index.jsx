import { useCallback, useContext } from "react";
import { AxiosContext } from "../../context/Axios";

export function useTemzone() {
  // Context
  const { temzoneApi } = useContext(AxiosContext);

  const Type = Object.freeze({
    Temtem: "temtem",
    Saipark: "saipark",
    Landmark: "landmark",
  });

  const getMarkers = useCallback(
    (types) =>
      temzoneApi.get("/markers", {
        params: { type: types.join(",") },
      }),
    [temzoneApi]
  );

  const updateTemtemMarker = useCallback(
    (id, marker) =>
      temzoneApi.put("/markers/" + id + "/temtem", {
        data: marker,
      }),
    [temzoneApi]
  );

  const updateSaiparkMarker = useCallback(
    (id, marker) =>
      temzoneApi.put("/markers/" + id + "/saipark", {
        data: marker,
      }),
    [temzoneApi]
  );

  const updateLandmarkMarker = useCallback(
    (id, marker) =>
      temzoneApi.put("/markers/" + id + "/landmark", {
        data: marker,
      }),
    [temzoneApi]
  );

  return {
    Type,
    getMarkers,
    updateTemtemMarker,
    updateSaiparkMarker,
    updateLandmarkMarker,
  };
}
