import { useCallback } from "react";
import { temzoneApi } from "../../services";
import { Type } from "../../utils";

export function useTemzone() {
  const getMarkers = useCallback(
    (types) =>
      temzoneApi.get("/markers", {
        params: { type: types.join(",") },
      }),
    []
  );

  const updateTemtemMarker = useCallback(
    (id, marker) =>
      temzoneApi.put("/markers/" + id + "/temtem", {
        data: marker,
      }),
    []
  );

  const updateSaiparkMarker = useCallback(
    (id, marker) =>
      temzoneApi.put("/markers/" + id + "/saipark", {
        data: marker,
      }),
    []
  );

  const updateLandmarkMarker = useCallback(
    (id, marker) =>
      temzoneApi.put("/markers/" + id + "/landmark", {
        data: marker,
      }),
    []
  );

  return {
    Type,
    getMarkers,
    updateTemtemMarker,
    updateSaiparkMarker,
    updateLandmarkMarker,
  };
}
