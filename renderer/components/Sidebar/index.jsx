import { useLanguageQuery } from "next-export-i18n";
import Image from "next/image";
import { useRouter } from "next/router";
import { logout } from "../../../services";
import NavLink from "../../components/NavLink";
import performanceIcon from "../../public/images/performance_icon.png";
import { sidebar } from "../../utils";

export default function Sidebar() {
  // Navigation
  const router = useRouter();
  // Internationalization
  const [query] = useLanguageQuery();

  return (
    <aside
      className="space-y-2 overflow-y-scroll bg-gray-900 p-3 scrollbar-hide"
      onDragStart={(e) => e.preventDefault()}
    >
      {/* Marker type filters */}
      {sidebar.map((item, i) => (
        <NavLink
          key={i}
          active={router.asPath.startsWith(item.href)}
          onClick={() => router.push({ pathname: item.href, query })}
        >
          <Image
            src={item.image}
            alt={item.label}
            width={36}
            height={36}
            quality={100}
          />
        </NavLink>
      ))}

      {/* Divider */}
      <hr className="mx-2 rounded border-t-2 border-t-gray-700" />

      {/* Logout button */}
      <NavLink
        active={false}
        onClick={() =>
          logout().then(() => router.push({ pathname: "/login", query }))
        }
      >
        <Image
          src={performanceIcon}
          alt="Log out"
          width={36}
          height={36}
          quality={100}
        />
      </NavLink>
    </aside>
  );
}
