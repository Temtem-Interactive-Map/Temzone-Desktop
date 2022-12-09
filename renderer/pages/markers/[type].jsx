import "leaflet/dist/leaflet.css";
import { useLanguageQuery, useTranslation } from "next-export-i18n";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { logout } from "../../../services/authentication";
import MarkerAccordion from "../../components/MarkerAccordion";
import NavLink from "../../components/NavLink";
import performanceIcon from "../../public/images/performance_icon.png";
import { sidebar, types } from "../../utils";

const Map = dynamic(() => import("../../components/Map"), {
  ssr: false,
});

function typeSplitter(list) {
  return list.reduce((res, curr) => {
    if (res[curr.type]) {
      res[curr.type].push(curr);
    } else {
      Object.assign(res, { [curr.type]: [curr] });
    }

    return res;
  }, {});
}

function getMarkers(type) {
  const zoom = 6;
  const tileSize = 256;
  const mapSize = tileSize * Math.pow(2, zoom);
  const mapCenter = mapSize / 2;

  const markers = typeSplitter([
    {
      id: 1,
      type: "temtem",
      title: "Mimit",
      subtitle: "Iwaba, East Path",
      condition: "Requires Fishing Rod",
      coordinates: {
        x: mapCenter,
        y: mapCenter,
      },
    },
    {
      id: 2,
      type: "saipark",
      title: "Saipark",
      subtitle: "West from Praise Coast",
      coordinates: {
        x: mapCenter + 500,
        y: mapCenter,
      },
    },
    {
      id: 3,
      type: "landmark",
      title: "Zadar",
      subtitle: "South of Praise Coast",
      coordinates: {
        x: mapCenter - 500,
        y: mapCenter,
      },
    },
  ]);

  return types[type]
    .map((type) => {
      return markers[type];
    })
    .flat();
}

export default function Markers() {
  // Navigation
  const router = useRouter();
  const type = router.query.type ?? "all";
  // Internationalization
  const [query] = useLanguageQuery();
  const { t } = useTranslation();

  // Test
  const markers = getMarkers(type);

  return (
    <>
      {/* Sidebar menu */}
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
              alt={t(item.label)}
              width={36}
              height={36}
              quality={100}
              priority={true}
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
            alt={t("logout")}
            width={36}
            height={36}
            quality={100}
            priority={true}
          />
        </NavLink>
      </aside>

      {/* Marker accordion */}
      <MarkerAccordion markers={markers} />

      {/* Airborne Archipelago map */}
      <Map markers={markers} />
    </>
  );
}
