import { useLanguageQuery, useTranslation } from "next-export-i18n";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });

  // Firebase login
  function login(data) {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      setError("email", { type: "remote", message: t("login_error") }, true);
      setError(
        "password",
        { type: "remote", message: t("login_error") },
        false
      );

      router.push({ pathname: "/markers/all", query });
    }, 3000);
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
          <form className="w-96 space-y-4" onSubmit={handleSubmit(login)}>
            {/* Email field */}
            <InputField
              id="email"
              label={t("email_field")}
              placeholder={t("email_template")}
              required={true}
              error={errors.email?.message}
              props={register("email", {
                required: t("field_required"),
              })}
            />

            {/* Password field */}
            <InputField
              id="password"
              label={t("password_field")}
              type="password"
              placeholder="••••••••"
              required={true}
              error={errors.password?.message}
              props={register("password", {
                required: t("field_required"),
              })}
            />

            {/* Log in button */}
            <LoadingButton loading={isLoading}>{t("login")}</LoadingButton>
          </form>
        </div>
      </div>
    </div>
  );
}
