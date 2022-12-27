import { createContext, useCallback, useState } from "react";

export const AccordionContext = createContext();

export function AccordionProvider({ children }) {
  // State
  const [openMarker, setOpenMarker] = useState(null);

  const isMarkerOpen = useCallback(
    (marker) => openMarker?.id === marker.id,
    [openMarker]
  );

  return (
    <AccordionContext.Provider value={{ setOpenMarker, isMarkerOpen }}>
      {children}
    </AccordionContext.Provider>
  );
}
