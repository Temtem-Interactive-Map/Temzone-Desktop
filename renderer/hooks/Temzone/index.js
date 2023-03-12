import { useCallback } from "react";
import { temzoneApi } from "services";
import { Type } from "utils";

export function useTemzone() {
  const getMarkers = useCallback(
    (types) =>
      temzoneApi.get("/markers", {
        params: new URLSearchParams({ types: types.join(",") }),
      }),
    []
  );

  const updateSpawnMarker = useCallback(
    (id, marker) =>
      temzoneApi.put("/markers/spawns/" + id, {
        subtitle: marker.subtitle,
        condition: marker.condition,
        coordinates: marker.coordinates,
      }),
    []
  );

  const updateSaiparkMarker = useCallback(
    (id, marker) =>
      temzoneApi.put("/markers/saipark/" + id, {
        coordinates: marker.coordinates,
      }),
    []
  );

  return {
    Type,
    getMarkers,
    updateSpawnMarker,
    updateSaiparkMarker,
  };
}
