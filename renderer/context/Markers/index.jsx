import { createContext, useEffect, useState } from "react";
import { getMarkers } from "../../services";

export const MarkersContext = createContext();

export function MarkersProvider({ type, children }) {
  // State
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const markers = getMarkers(type);

    setMarkers(markers);
  }, [type, setMarkers]);

  return (
    <MarkersContext.Provider value={{ markers, setMarkers }}>
      {children}
    </MarkersContext.Provider>
  );
}
