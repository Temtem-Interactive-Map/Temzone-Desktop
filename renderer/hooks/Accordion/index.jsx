import { useContext } from "react";
import { AccordionContext } from "../../context/Accordion";

export function useAccordionContext() {
  // State
  const { markers, handleAccordionClick, isMarkerOpen, updateMarker } =
    useContext(AccordionContext);

  return {
    markers,
    handleAccordionClick,
    isMarkerOpen,
    updateMarker,
  };
}
