import { useLanguageQuery, useTranslation } from "next-export-i18n";
import { useRouter } from "next/router";
import InputField from "../../components/InputField";

export default function Login() {
  const router = useRouter();
  const [query] = useLanguageQuery();
  const { t } = useTranslation();

  function handleSubmit(e) {
    e.preventDefault();

    router.push({ pathname: "/markers/all", query });
  }

  return (
    <div className="w-full bg-login bg-cover bg-center">
      <div className="flex h-full items-center justify-center backdrop-blur">
        {/* Sign in card */}
        <div className="space-y-4 rounded-md border border-gray-700 bg-gray-800 p-6 shadow">
          {/* Sign in branding */}
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-100">
            {t("sign_in_branding")}
          </h1>

          {/* Sign in form */}
          <form className="w-96 space-y-4" onSubmit={handleSubmit}>
            {/* Email field */}
            <InputField
              id="email"
              label={t("email_field")}
              type="email"
              placeholder={t("password_template")}
              required={true}
            />

            {/* Password field */}
            <InputField
              id="password"
              label={t("password_field")}
              type="password"
              placeholder="••••••••"
              required={true}
            />

            {/* Sign in button */}
            <button
              type="submit"
              className="w-full rounded-md bg-brand py-2.5 text-center text-sm font-medium text-gray-100"
            >
              {t("sign_in")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
