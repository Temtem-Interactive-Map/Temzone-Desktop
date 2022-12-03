import { useLanguageQuery } from "next-export-i18n";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavLink({ href, children }) {
  const router = useRouter();
  const active = router.asPath.startsWith(href);
  const [query] = useLanguageQuery();

  return (
    <div className="group relative block">
      {/* Left arrow */}
      <div className="absolute -left-3 flex h-full items-center">
        <div
          className={
            (active
              ? "h-10"
              : "h-5 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100") +
            " w-1 origin-left rounded-r bg-white transition-all duration-200"
          }
        />
      </div>

      {/* Main button */}
      <Link
        href={{ pathname: href, query }}
        className="group-active:translate-y-px"
      >
        <div
          className={
            (active
              ? "rounded-2xl bg-brand"
              : "rounded-3xl bg-gray-700 group-hover:rounded-2xl group-hover:bg-brand") +
            " flex h-12 w-12 items-center justify-center overflow-hidden transition-all duration-200"
          }
        >
          {children}
        </div>
      </Link>
    </div>
  );
}
