import { createContext, useState } from "react";

export const AccordionContext = createContext();

export function AccordionProvider({ children }) {
  // State
  const [markers, setMarkers] = useState([]);
  const [openMarker, setOpenMarker] = useState(null);

  return (
    <AccordionContext.Provider
      value={{ markers, setMarkers, openMarker, setOpenMarker }}
    >
      {children}
    </AccordionContext.Provider>
  );
}
