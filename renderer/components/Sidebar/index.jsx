import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import performanceIcon from "../../public/images/performance_icon.png";
import { logout } from "../../services";
import { sidebar } from "../../utils";
import { NavLink } from "../NavLink";
import { Tooltip } from "../Tooltip";

export function Sidebar() {
  // Navigation
  const router = useRouter();

  // Internationalization
  const { t } = useTranslation();

  const handleLogout = useCallback(() => {
    logout().then(() => router.push("/login"));
  }, [router]);

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
