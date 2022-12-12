import { useLanguageQuery, useTranslation } from "next-export-i18n";
import Image from "next/image";
import { useRouter } from "next/router";
import { logout } from "../../../services";
import NavLink from "../../components/NavLink";
import performanceIcon from "../../public/images/performance_icon.png";
import { sidebar } from "../../utils";
import Tooltip from "../Tooltip";

export default function Sidebar() {
  // Navigation
  const router = useRouter();
  // Internationalization
  const [query] = useLanguageQuery();
  const { t } = useTranslation();

  return (
    <aside
      className="space-y-2 bg-gray-900 p-3"
      onDragStart={(e) => e.preventDefault()}
    >
      {/* Marker type filters */}
      {sidebar.map((item, i) => (
        <Tooltip key={i} message={t(item.label)}>
          <NavLink
            active={router.asPath.startsWith(item.href)}
            onClick={() => router.push({ pathname: item.href, query })}
          >
            <Image
              src={item.image}
              alt={t(item.label)}
              width={36}
              height={36}
              quality={100}
            />
          </NavLink>
        </Tooltip>
      ))}

      {/* Divider */}
      <hr className="mx-2 rounded border-t-2 border-t-gray-700" />

      {/* Logout button */}
      <Tooltip message={t("logout")}>
        <NavLink
          active={false}
          onClick={() =>
            logout().then(() => router.push({ pathname: "/login", query }))
          }
        >
          <Image
            src={performanceIcon}
            alt={t("logout")}
            width={36}
            height={36}
            quality={100}
          />
        </NavLink>
      </Tooltip>
    </aside>
  );
}
