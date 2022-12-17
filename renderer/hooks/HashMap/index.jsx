import { useCallback, useState } from "react";

export function useHashMap() {
  const [map, setMap] = useState(new Map());

  const actions = {
    set: useCallback((key, value) => {
      setMap((prev) => {
        const copy = new Map(prev);

        copy.set(key, value);

        return copy;
      });
    }, []),

    remove: useCallback((key) => {
      setMap((prev) => {
        const copy = new Map(prev);

        copy.delete(key);

        return copy;
      });
    }, []),
  };

  return [map, actions];
}
