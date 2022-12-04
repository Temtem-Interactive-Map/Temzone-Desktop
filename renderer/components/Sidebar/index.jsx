import { useTranslation } from "next-export-i18n";
import Image from "next/image";
import { sidebar } from "../../data";
import performanceIcon from "../../public/images/performance_icon.png";
import NavLink from "../NavLink";

export default function Sidebar() {
  // Internationalization
  const { t } = useTranslation();

  return (
    <aside
      className="space-y-2 overflow-y-scroll bg-gray-900 p-3 scrollbar-hide"
      onDragStart={(e) => e.preventDefault()}
    >
      {/* Marker filters */}
      {sidebar.map((item, i) => (
        <NavLink key={i} href={item.href}>
          <Image
            src={item.image}
            alt={t(item.label)}
            width={36}
            height={36}
            quality={100}
          />
        </NavLink>
      ))}

      {/* Divider */}
      <hr className="mx-2 rounded border-t-2 border-t-white/[0.06]" />

      {/* Logout button */}
      <NavLink href="/login">
        <Image
          src={performanceIcon}
          alt={t("logout")}
          width={36}
          height={36}
          quality={100}
        />
      </NavLink>
    </aside>
  );
}
