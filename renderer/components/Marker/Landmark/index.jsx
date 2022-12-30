import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { CoordinatesField, LocationField } from "..";
import { useAccordionContext } from "../../../hooks/Accordion";
import { updateLandmarkMarker } from "../../../services";
import { LoadingButton } from "../../LoadingButton";

export function LandmarkMarker({ marker }) {
  // Navigation
  const router = useRouter();
  const type = router.query.type ?? "all";

  // Internationalization
  const { t } = useTranslation();

  // Validation
  const { handleSubmit } = useFormContext();

  // State
  const [isLoading, setLoading] = useState(false);
  const { setOpenMarker } = useAccordionContext();

  const handleMarkerUpdate = useCallback(
    (data) => {
      const subtitle = data.location.trim();
      const x = data.coordinate_horizontal;
      const y = data.coordinate_vertical;

      setLoading(true);
      updateLandmarkMarker(marker.id, {
        subtitle,
        coordinates: { x, y },
      })
        .then(() => {
          marker.subtitle = subtitle;
          marker.coordinates = { x, y };

          setOpenMarker(marker);
          mutate({ url: "/markers", args: type }, (prevMarkers) => {
            prevMarkers.map((prevMarker) =>
              prevMarker.id === marker.id ? marker : prevMarker
            );
          });
        })
        .catch((error) => toast.warn(error.message))
        .finally(() => setLoading(false));
    },
    [marker, setOpenMarker, type]
  );

  return (
    <form
      noValidate
      className="space-y-4"
      onSubmit={handleSubmit(handleMarkerUpdate)}
    >
      {/* Location field */}
      <LocationField
        location={marker.subtitle}
        placeholder={t("location_template")}
      />

      {/* Coordinates field */}
      <CoordinatesField marker={marker} />

      {/* Save button */}
      <LoadingButton loading={isLoading}>{t("save")}</LoadingButton>
    </form>
  );
}
