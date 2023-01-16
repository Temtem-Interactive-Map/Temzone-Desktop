import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { InputField } from "../../components/Fields/InputField";
import { LoadingButton } from "../../components/LoadingButton";
import { useAuth } from "../../hooks/Auth";

export default function Login() {
  // Navigation
  const router = useRouter();

  // Internationalization
  const { t } = useTranslation();

  // Validation
  const methods = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });

  // Authentication
  const { login } = useAuth();

  // State
  const [isLoading, setLoading] = useState(false);

  const handleLoginSubmit = useCallback(
    (data) => {
      const email = data.email.trim();
      const password = data.password.trim();

      setLoading(true);
      login(email, password)
        .then(() => router.push("/markers/all"))
        .catch((error) => {
          if (error.code === 400) {
            methods.setError(
              "email",
              { type: "remote", message: error.message },
              true
            );
            methods.setError(
              "password",
              { type: "remote", message: error.message },
              false
            );
          } else {
            toast.warn(error.message);
          }
        })
        .finally(() => setLoading(false));
    },
    [login, methods, router]
  );

  return (
    <div className="w-full bg-login bg-cover bg-center">
      <div className="flex h-full items-center justify-center backdrop-blur">
        {/* Log in card */}
        <div className="space-y-4 rounded-md border border-gray-700 bg-gray-800 p-6 shadow">
          {/* Log in branding */}
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-100">
            {t("branding.login")}
          </h1>

          {/* Log in form */}
          <FormProvider {...methods}>
            <form
              noValidate
              className="w-96 space-y-4"
              onSubmit={methods.handleSubmit(handleLoginSubmit)}
            >
              {/* Email field */}
              <InputField
                id="email"
                type="text"
                label={t("field.email")}
                placeholder={t("field.placeholder.email")}
                options={{
                  required: t("error.required"),
                  validate: (value) =>
                    value.trim() ? true : t("error.required"),
                }}
              />

              {/* Password field */}
              <InputField
                id="password"
                type="password"
                label={t("field.password")}
                placeholder="••••••••"
                options={{
                  required: t("error.required"),
                  validate: (value) =>
                    value.trim() ? true : t("error.required"),
                }}
              />

              {/* Log in button */}
              <LoadingButton loading={isLoading}>
                {t("button.login")}
              </LoadingButton>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
