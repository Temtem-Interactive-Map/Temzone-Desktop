import { useTranslation } from "next-export-i18n";
import {
  mapCenter,
  mapMaxHorizontal,
  mapMaxVertical,
  mapMinHorizontal,
  mapMinVertical,
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

  return (
    <div className="flex flex-row space-x-4">
      <InputField
        id="coordinate_horizontal"
        type="number"
        label={t("coordinate_horizontal_field")}
        value={marker.coordinates?.x}
        placeholder={mapCenter}
        options={{
          required: t("required_field"),
          min: {
            value: mapMinHorizontal,
            message: t("min_field").replace("@value", mapMinHorizontal),
          },
          max: {
            value: mapMaxHorizontal,
            message: t("max_field").replace("@value", mapMaxHorizontal),
          },
          valueAsNumber: true,
        }}
      />

      <InputField
        id="coordinate_vertical"
        type="number"
        label={t("coordinate_vertical_field")}
        value={marker.coordinates?.y}
        placeholder={mapCenter}
        options={{
          required: t("required_field"),
          min: {
            value: mapMinVertical,
            message: t("min_field").replace("@value", mapMinVertical),
          },
          max: {
            value: mapMaxVertical,
            message: t("max_field").replace("@value", mapMaxVertical),
          },
          valueAsNumber: true,
        }}
      />
    </div>
  );
}
