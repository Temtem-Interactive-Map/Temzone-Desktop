import { NavLink } from "components/NavLink";
import { Tooltip } from "components/Tooltip";
import { useAuth } from "hooks/Auth";
import Image from "next/image";
import { useRouter } from "next/router";
import performanceIcon from "public/images/performance_icon.png";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { sidebar } from "utils";

export function Sidebar() {
  // Navigation
  const router = useRouter();

  // Internationalization
  const { t } = useTranslation();

  // Authentication
  const { logout } = useAuth();

  const handleLogout = useCallback(() => {
    logout().then(() => router.push("/login"));
  }, [logout, router]);

  return (
    <aside
      className="space-y-2 bg-gray-900 p-3"
      onDragStart={(event) => event.preventDefault()}
    >
      {/* Marker type filters */}
      {sidebar.map((item, i) => (
        <Tooltip key={i} message={t(item.label)}>
          <NavLink
            active={router.asPath.startsWith(item.href)}
            onClick={() => router.push(item.href)}
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
      <Tooltip message={t("tooltip.logout")}>
        <NavLink active={false} onClick={handleLogout}>
          <Image
            src={performanceIcon}
            alt={t("tooltip.logout")}
            width={36}
            height={36}
            quality={100}
          />
        </NavLink>
      </Tooltip>
    </aside>
  );
}
