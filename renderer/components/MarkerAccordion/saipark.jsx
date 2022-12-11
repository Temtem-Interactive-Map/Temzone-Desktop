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

export default function SaiparkkMarker({ marker }) {
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
        noValidate
        className="space-y-4"
        onSubmit={methods.handleSubmit(onUpdateSubmit)}
      >
        {/* Coordinate field */}
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

        {/* Save button */}
        <LoadingButton loading={isLoading}>{t("save")}</LoadingButton>
      </form>
    </FormProvider>
  );
}
