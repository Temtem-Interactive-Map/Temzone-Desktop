import { useTranslation } from "next-export-i18n";
import { useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useMapContext } from "../../hooks/Map";
import {
  MARKER_MAX_HORIZONTAL,
  MARKER_MAX_VERTICAL,
  MARKER_MIN_HORIZONTAL,
  MARKER_MIN_VERTICAL,
} from "../../utils";
import { CounterField } from "../Fields/CounterField";
import { InputField } from "../Fields/InputField";

export function ConditionField({ condition, placeholder }) {
  // Internationalization
  const { t } = useTranslation();

  return (
    <InputField
      id="condition"
      type="text"
      label={t("condition_field")}
      value={condition}
      placeholder={placeholder}
      options={{
        maxLength: { value: 40 },
      }}
    />
  );
}

export function LocationField({ location, placeholder }) {
  // Internationalization
  const { t } = useTranslation();

  return (
    <InputField
      id="location"
      type="text"
      label={t("location_field")}
      value={location}
      placeholder={placeholder}
      options={{
        required: t("required_field"),
        validate: (value) => (value.trim() ? true : t("required_field")),
        maxLength: { value: 40 },
      }}
    />
  );
}

export function CoordinatesField({ marker }) {
  // Internationalization
  const { t } = useTranslation();

  // State
  const { getValues, setValue } = useFormContext();
  const { getMarkerCoordinates, onMarkerDrag, moveMarker } = useMapContext();
  const coordinates = getMarkerCoordinates(marker);

  useEffect(() => {
    onMarkerDrag(marker, (coordinates) => {
      setValue("coordinate_horizontal", coordinates.x);
      setValue("coordinate_vertical", coordinates.y);
    });
  }, [marker, onMarkerDrag, setValue]);

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
        label={t("coordinate_horizontal_field")}
        value={coordinates.x}
        options={{ valueAsNumber: true }}
        onChange={handleCoordinateHorizontalChange}
      />

      <CounterField
        id="coordinate_vertical"
        label={t("coordinate_vertical_field")}
        value={coordinates.y}
        options={{ valueAsNumber: true }}
        onChange={handleCoordinateVerticalChange}
      />
    </div>
  );
}
