import { useLanguageQuery } from "next-export-i18n";
import { useRouter } from "next/router";

export default function NavLink({ href, children }) {
  // Navigation
  const router = useRouter();
  const active = router.asPath.startsWith(href);
  // Internationalization
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
      <button
        className={
          (active ? "focus:rounded-2xl" : "focus:rounded-3xl") +
          " focus:outline focus:outline-2 focus:outline-blue-400 group-active:translate-y-px"
        }
        onClick={() => {
          router.push({ pathname: href, query });
        }}
      >
        <div
          className={
            (active
              ? "rounded-2xl bg-indigo-500"
              : "rounded-3xl bg-gray-700 group-hover:rounded-2xl group-hover:bg-indigo-500") +
            " flex h-12 w-12 items-center justify-center overflow-hidden transition-all duration-200"
          }
        >
          {children}
        </div>
      </button>
    </div>
  );
}
