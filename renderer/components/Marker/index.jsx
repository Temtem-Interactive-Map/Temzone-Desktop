import { useTranslation } from "next-export-i18n";
import { useCallback } from "react";
import { useMap } from "../../hooks";
import {
  mapCenter,
  markerMaxHorizontal,
  markerMaxVertical,
  markerMinHorizontal,
  markerMinVertical,
} from "../../utils";
import { InputField } from "../InputField";

export function ConditionField({ marker }) {
  // Internationalization
  const { t } = useTranslation();

  return (
    <InputField
      id="condition"
      type="text"
      label={t("condition_field")}
      value={marker.condition}
      placeholder={t("condition_template")}
      options={{
        maxLength: { value: 40 },
      }}
    />
  );
}

export function LocationField({ marker }) {
  // Internationalization
  const { t } = useTranslation();

  return (
    <InputField
      id="location"
      type="text"
      label={t("location_field")}
      value={marker.subtitle}
      placeholder={t("location_template")}
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
  const { getMarkerCoordinates, moveMarker } = useMap();
  const coordinates = getMarkerCoordinates(marker);

  const handleCoordinateHorizontalChange = useCallback(
    (event) => {
      const x = parseInt(event.target.value);

      const markerRef = Object.assign({}, marker);
      if (!isNaN(x)) {
        if (x < markerMinHorizontal) {
          markerRef.coordinates = {
            x: markerMinHorizontal,
            y: coordinates.y,
          };
        } else {
          markerRef.coordinates = {
            x,
            y: coordinates.y,
          };
        }
        moveMarker(markerRef);
      }
    },
    [marker, coordinates.y, moveMarker]
  );

  const handleCoordinateVerticalChange = useCallback(
    (event) => {
      const y = parseInt(event.target.value);

      const markerRef = Object.assign({}, marker);
      if (!isNaN(y)) {
        if (y < markerMinVertical) {
          markerRef.coordinates = {
            x: coordinates.x,
            y: markerMinVertical,
          };
        } else {
          markerRef.coordinates = {
            x: coordinates.x,
            y,
          };
        }
        moveMarker(markerRef);
      }
    },
    [marker, coordinates.x, moveMarker]
  );

  return (
    <div className="flex flex-row space-x-4">
      <InputField
        id="coordinate_horizontal"
        type="number"
        label={t("coordinate_horizontal_field")}
        value={coordinates.x}
        placeholder={mapCenter}
        options={{
          onChange: handleCoordinateHorizontalChange,
          required: t("required_field"),
          min: {
            value: markerMinHorizontal,
            message: t("min_field").replace("@value", markerMinHorizontal),
          },
          max: {
            value: markerMaxHorizontal,
            message: t("max_field").replace("@value", markerMaxHorizontal),
          },
          valueAsNumber: true,
        }}
      />

      <InputField
        id="coordinate_vertical"
        type="number"
        label={t("coordinate_vertical_field")}
        value={coordinates.y}
        placeholder={mapCenter}
        options={{
          onChange: handleCoordinateVerticalChange,
          required: t("required_field"),
          min: {
            value: markerMinVertical,
            message: t("min_field").replace("@value", markerMinVertical),
          },
          max: {
            value: markerMaxVertical,
            message: t("max_field").replace("@value", markerMaxVertical),
          },
          valueAsNumber: true,
        }}
      />
    </div>
  );
}
