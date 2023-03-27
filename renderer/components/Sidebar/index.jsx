import { NavButton } from "components/NavButton";
import { Tooltip } from "components/Tooltip";
import { useAccordion } from "hooks/Accordion";
import { t } from "locales";
import Image from "next/image";
import { useRouter } from "next/router";
import performanceIcon from "public/images/performance_icon.png";
import { useEffect, useState } from "react";
import { getMarkers, logout } from "services";
import { sidebar } from "utils";

export function Sidebar() {
  // Navigation
  const router = useRouter();

  // State
  const [selectedOption, setOption] = useState(sidebar[0]);
  const { updateAccordion } = useAccordion();

  useEffect(() => {
    const markers = getMarkers(selectedOption.types);

    updateAccordion(markers);
  }, [selectedOption, updateAccordion]);

  return (
    <aside
      className="space-y-2 bg-gray-900 p-3"
      onDragStart={(event) => event.preventDefault()}
    >
      {/* Marker type filters */}
      {sidebar.map((option, i) => (
        <Tooltip key={i} message={t(option.tooltip)}>
          <NavButton
            active={selectedOption === option}
            onClick={() => setOption(option)}
          >
            <Image
              src={option.image}
              alt={t(option.tooltip)}
              width={36}
              height={36}
              quality={100}
            />
          </NavButton>
        </Tooltip>
      ))}

      {/* Divider */}
      <hr className="mx-2 rounded border-t-2 border-t-gray-700" />

      {/* Logout button */}
      <Tooltip message={t("tooltip.logout")}>
        <NavButton
          active={false}
          onClick={() => logout().then(() => router.push("/login"))}
        >
          <Image
            src={performanceIcon}
            alt={t("tooltip.logout")}
            width={36}
            height={36}
            quality={100}
          />
        </NavButton>
      </Tooltip>
    </aside>
  );
}
