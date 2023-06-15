import { PlaceholderAccordion } from "components/Accordion/Placeholder";
import { Arrow } from "components/Icons";
import { SaiparkMarker } from "components/Marker/Saipark";
import { SpawnMarker } from "components/Marker/Spawn";
import { NavButton } from "components/NavButton";
import { Tooltip } from "components/Tooltip";
import { useAccordion } from "hooks/Accordion";
import { t } from "locales";
import Image from "next/image";
import { useRouter } from "next/router";
import performanceIcon from "public/images/performance_icon.png";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMarkers, logout } from "services";
import useSWR from "swr";
import { SIDEBAR, TEMTEM_LIST, markerIconPath } from "utils";

export function Accordion() {
  // Navigation
  const router = useRouter();

  // State
  const {
    markers,
    isMarkerOpen,
    handleAccordionClick,
    updateAccordion,
    isLoading: isLocked,
  } = useAccordion();
  const [sidebarOption, setSidebarOption] = useState(SIDEBAR[0]);
  const [selectOption, setSelectOption] = useState(TEMTEM_LIST[0]);

  const { data, isLoading, isValidating, error } = useSWR(
    "markers",
    () => getMarkers(),
    {
      onSuccess: (markers) => {
        updateAccordion(markers);
      },
      onError: (error) => {
        toast.warn(error.message);
      },
    }
  );

  useEffect(() => {
    if (!data) return;

    switch (sidebarOption) {
      case SIDEBAR[1]:
        updateAccordion(
          data.filter(
            (marker) =>
              marker.title.includes(selectOption) &&
              sidebarOption.types.includes(marker.type)
          )
        );
        break;
      default:
        updateAccordion(
          data.filter((marker) => sidebarOption.types.includes(marker.type))
        );
        break;
    }
  }, [data, selectOption, sidebarOption, updateAccordion]);

  return (
    <>
      {/* Sidebar menu */}
      <aside
        className="space-y-2 bg-gray-900 p-3"
        onDragStart={(event) => event.preventDefault()}
      >
        {/* Marker type filters */}
        {SIDEBAR.map((option, i) => (
          <Tooltip key={i} message={t(option.tooltip)}>
            <NavButton
              active={sidebarOption === option}
              disabled={isLocked || isLoading || isValidating || error}
              onClick={() => setSidebarOption(option)}
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

      {/* Accordion */}
      <section
        className="w-120 space-y-3 overflow-y-scroll bg-gray-700 p-3"
        onDragStart={(event) => event.preventDefault()}
      >
        {/* Markers selector */}
        {sidebarOption === SIDEBAR[1] && (
          <div className="rounded-lg bg-gray-800 p-4 text-gray-100 shadow">
            <select
              tabIndex={-1}
              className="block w-full rounded-md border border-gray-600 bg-gray-700 p-2.5 font-medium focus:outline focus:outline-2 focus:outline-blue-400 disabled:opacity-100"
              value={selectOption}
              disabled={isLocked}
              onChange={(event) => setSelectOption(event.target.value)}
            >
              {TEMTEM_LIST.map((option, i) => (
                <option key={i} className="text-md">
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Markers accordion */}
        {isLoading || isValidating || error
          ? [...Array(10).keys()].map((key) => (
              <PlaceholderAccordion key={key} />
            ))
          : markers.map((marker) => (
              <div
                key={marker.id}
                id={"#" + marker.id}
                className="rounded-lg bg-gray-800 text-gray-100 shadow"
              >
                <button
                  tabIndex={-1}
                  className="flex w-full cursor-pointer items-center space-x-3 p-4 outline-none active:translate-y-px"
                  disabled={isLocked}
                  onClick={() => handleAccordionClick(marker)}
                >
                  {/* Marker portrait */}
                  <div className="relative h-14 w-14 flex-none">
                    <Image
                      src={markerIconPath(marker)}
                      alt={marker.title}
                      width={48}
                      height={48}
                      quality={100}
                      className="h-full w-full"
                    />

                    {/* Ping notification (means that the marker has not been added to the map) */}
                    {marker.coordinates === null && (
                      <div className="absolute -right-1 -top-1">
                        <div className="absolute h-3 w-3 animate-ping rounded-full bg-gray-100 opacity-75" />
                        <div className="h-3 w-3 rounded-full bg-gray-100" />
                      </div>
                    )}
                  </div>

                  {/* Marker information */}
                  <div className="w-20 flex-auto">
                    <div className="flex flex-col text-start">
                      <span className="truncate text-xl font-bold leading-tight">
                        {marker.title.split(" ")[0]}
                      </span>
                      <span className="truncate text-lg font-medium leading-tight text-gray-300">
                        {marker.subtitle.current}
                      </span>
                    </div>
                  </div>

                  {/* Toogle marker form */}
                  <Arrow
                    className={
                      (!isMarkerOpen(marker) && " rotate-90") +
                      " h-9 w-9 flex-none justify-start transition duration-200"
                    }
                  />
                </button>

                {/* Marker form */}
                {isMarkerOpen(marker) && (
                  <div className="p-4 pt-1">
                    {marker.type === "spawn" ? (
                      <SpawnMarker marker={marker} />
                    ) : marker.type === "saipark" ? (
                      <SaiparkMarker marker={marker} />
                    ) : null}
                  </div>
                )}
              </div>
            ))}
      </section>
    </>
  );
}
