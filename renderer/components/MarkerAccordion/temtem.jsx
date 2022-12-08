import { useTranslation } from "next-export-i18n";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  mapCenter,
  mapMaxHorizontal,
  mapMaxVertical,
  mapMinHorizontal,
  mapMinVertical,
} from "../../utils";
import InputField from "../InputField";
import LoadingButton from "../LoadingButton";

export default function TemtemMarker({ marker }) {
  // Internationalization
  const { t } = useTranslation();
  // State
  const [isLoading, setLoading] = useState(false);
  // Validation
  const methods = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });

  function onUpdateSubmit(data) {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  return (
    <FormProvider {...methods}>
      <form
        className="space-y-4"
        onSubmit={methods.handleSubmit(onUpdateSubmit)}
      >
        {/* Condition field */}
        <InputField
          id="condition"
          label={t("condition_field")}
          value={marker.condition}
          placeholder={t("condition_template")}
          options={{
            maxLength: { value: 64, message: t("max_length_field") },
          }}
        />

        {/* Location field */}
        <InputField
          id="location"
          label={t("location_field")}
          value={marker.subtitle}
          placeholder={t("temtem_location_template")}
          options={{
            required: t("required_field"),
            maxLength: { value: 64, message: t("max_length_field") },
          }}
        />

        {/* Coordinate field */}
        <div className="flex flex-row space-x-4">
          <InputField
            id="coordinate_horizontal"
            label={t("coordinate_horizontal_field")}
            type="number"
            value={marker.coordinates.x}
            placeholder={mapCenter}
            options={{
              required: t("required_field"),
              min: { value: mapMinHorizontal, message: "" },
              max: { value: mapMaxHorizontal, message: "" },
            }}
          />

          <InputField
            id="coordinate_vertical"
            label={t("coordinate_vertical_field")}
            type="number"
            value={marker.coordinates.y}
            placeholder={mapCenter}
            options={{
              required: t("required_field"),
              min: { value: mapMinVertical, message: "" },
              max: { value: mapMaxVertical, message: "" },
            }}
          />
        </div>

        {/* Save button */}
        <LoadingButton loading={isLoading}>{t("save")}</LoadingButton>
      </form>
    </FormProvider>
  );
}
