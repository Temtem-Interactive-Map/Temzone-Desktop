import { createContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const AccordionContext = createContext();

export function AccordionProvider({ children }) {
  // Validation
  const methods = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });

  // State
  const [openMarker, setOpenMarker] = useState(null);

  return (
    <AccordionContext.Provider value={{ openMarker, setOpenMarker }}>
      <FormProvider {...methods}>{children}</FormProvider>
    </AccordionContext.Provider>
  );
}
