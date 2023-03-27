import { CounterField } from "components/Fields/CounterField";
import { InputField } from "components/Fields/InputField";
import { LoadingButton } from "components/LoadingButton";
import { useAccordion } from "hooks/Accordion";
import { useMap } from "hooks/Map";
import { t } from "locales";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import {
  MARKER_MAX_HORIZONTAL,
  MARKER_MAX_VERTICAL,
  MARKER_MIN_HORIZONTAL,
  MARKER_MIN_VERTICAL,
} from "utils";

export function ConditionField({ condition, placeholder }) {
  return (
    <InputField
      id="condition"
      type="text"
      label={t("field.condition")}
      value={condition}
      placeholder={placeholder}
      options={{
        maxLength: { value: 40 },
      }}
    />
  );
}

export function LocationField({ location, placeholder }) {
  return (
    <InputField
      id="location"
      type="text"
      label={t("field.location")}
      value={location}
      placeholder={placeholder}
      options={{
        required: t("error.required"),
        validate: (value) => (value.trim() ? true : t("error.required")),
        maxLength: { value: 40 },
      }}
    />
  );
}

export function CoordinatesField({ marker }) {
  // Validation
  const { getValues, setValue } = useFormContext();

  // State
  const { getMarkerCoordinates, subscribeMarkerDrag, moveMarker } = useMap();
  const coordinates = getMarkerCoordinates(marker);

  useEffect(() => {
    subscribeMarkerDrag(marker, (_marker, coordinates) => {
      setValue("coordinate_horizontal", coordinates.x);
      setValue("coordinate_vertical", coordinates.y);
    });
  }, [marker, subscribeMarkerDrag, setValue]);

  const handleCoordinateHorizontalChange = useCallback(
    (x) => {
      if (x >= MARKER_MIN_HORIZONTAL && x <= MARKER_MAX_HORIZONTAL) {
        const y = getValues("coordinate_vertical");

        moveMarker({ id: marker.id, coordinates: { x, y } });

        return true;
      } else {
        return false;
      }
    },
    [marker.id, getValues, moveMarker]
  );

  const handleCoordinateVerticalChange = useCallback(
    (y) => {
      if (y >= MARKER_MIN_VERTICAL && y <= MARKER_MAX_VERTICAL) {
        const x = getValues("coordinate_horizontal");

        moveMarker({ id: marker.id, coordinates: { x, y } });

        return true;
      } else {
        return false;
      }
    },
    [marker.id, getValues, moveMarker]
  );

  return (
    <div className="flex flex-row space-x-4">
      <CounterField
        id="coordinate_horizontal"
        label={t("field.coordinate_horizontal")}
        value={coordinates.x}
        options={{ valueAsNumber: true }}
        onChange={handleCoordinateHorizontalChange}
      />

      <CounterField
        id="coordinate_vertical"
        label={t("field.coordinate_vertical")}
        value={coordinates.y}
        options={{ valueAsNumber: true }}
        onChange={handleCoordinateVerticalChange}
      />
    </div>
  );
}

export function Marker({ handleMarkerUpdate, marker, children }) {
  // Validation
  const { handleSubmit } = useFormContext();

  // State
  const [isLoading, setLoading] = useState(false);
  const { updateMarker } = useAccordion();

  const handleMarkerUpdateSubmit = useCallback(
    (data) => {
      const x = data.coordinate_horizontal;
      const y = data.coordinate_vertical;

      setLoading(true);
      handleMarkerUpdate(data, { x, y })
        .then(() => {
          marker.coordinates = { x, y };

          updateMarker(marker);
        })
        .catch((error) => toast.warn(error.message))
        .finally(() => setLoading(false));
    },
    [marker, handleMarkerUpdate, updateMarker]
  );

  return (
    <form
      noValidate
      className="space-y-4"
      onSubmit={handleSubmit(handleMarkerUpdateSubmit)}
    >
      {/* Children marker type fields */}
      {children}

      {/* Coordinates field */}
      <CoordinatesField marker={marker} />

      {/* Save button */}
      <LoadingButton loading={isLoading}>{t("button.save")}</LoadingButton>
    </form>
  );
}
