import { useLanguageQuery, useTranslation } from "next-export-i18n";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { login } from "../../../services";
import InputField from "../../components/InputField";
import LoadingButton from "../../components/LoadingButton";

export default function Login() {
  // Navigation
  const router = useRouter();
  // Internationalization
  const [query] = useLanguageQuery();
  const { t } = useTranslation();
  // State
  const [isLoading, setLoading] = useState(false);
  // Validation
  const methods = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });

  function onLoginSubmit(data) {
    const email = data.email.trim();
    const password = data.password.trim();

    setLoading(true);
    login(email, password)
      .then(() => router.push({ pathname: "/markers/all", query }))
      .catch((error) => {
        methods.setError(
          "email",
          { type: "remote", message: t(error.message) },
          true
        );
        methods.setError(
          "password",
          { type: "remote", message: t(error.message) },
          false
        );
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="w-full bg-login bg-cover bg-center">
      <div className="flex h-full items-center justify-center backdrop-blur">
        {/* Log in card */}
        <div className="space-y-4 rounded-md border border-gray-700 bg-gray-800 p-6 shadow">
          {/* Log in branding */}
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-100">
            {t("login_branding")}
          </h1>

          {/* Log in form */}
          <FormProvider {...methods}>
            <form
              noValidate
              className="w-96 space-y-4"
              onSubmit={methods.handleSubmit(onLoginSubmit)}
            >
              {/* Email field */}
              <InputField
                id="email"
                type="text"
                label={t("email_field")}
                placeholder={t("email_template")}
                options={{
                  required: t("required_field"),
                  validate: (value) =>
                    value.trim() ? true : t("required_field"),
                }}
              />

              {/* Password field */}
              <InputField
                id="password"
                type="password"
                label={t("password_field")}
                placeholder="••••••••"
                options={{
                  required: t("required_field"),
                  validate: (value) =>
                    value.trim() ? true : t("required_field"),
                }}
              />

              {/* Log in button */}
              <LoadingButton loading={isLoading}>{t("login")}</LoadingButton>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
