import { useTranslation } from "next-export-i18n";
import { useCallback } from "react";
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
  const { getMarkerCoordinates, moveMarker } = useMapContext();
  const coordinates = getMarkerCoordinates(marker);

  const handleCoordinateHorizontalChange = useCallback(
    (value) => {
      if (value >= MARKER_MIN_HORIZONTAL && value <= MARKER_MAX_HORIZONTAL) {
        coordinates.x = value;

        moveMarker({ id: marker.id, coordinates });

        return true;
      } else {
        return false;
      }
    },
    [marker.id, coordinates, moveMarker]
  );

  const handleCoordinateVerticalChange = useCallback(
    (value) => {
      if (value >= MARKER_MIN_VERTICAL && value <= MARKER_MAX_VERTICAL) {
        coordinates.y = value;

        moveMarker({ id: marker.id, coordinates });

        return true;
      } else {
        return false;
      }
    },
    [marker.id, coordinates, moveMarker]
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
