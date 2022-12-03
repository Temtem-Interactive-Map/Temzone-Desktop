import { useLanguageQuery, useTranslation } from "next-export-i18n";
import Link from "next/link";

export default function Login() {
  const [query] = useLanguageQuery();
  const { t } = useTranslation();

  return (
    <>
      <Link href={{ pathname: "/markers/all", query }} className="text-black">
        {t("login")}
      </Link>
    </>
  );
}
