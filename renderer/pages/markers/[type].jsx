import "leaflet/dist/leaflet.css";
import { useTranslation } from "next-export-i18n";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import NavLink from "../../components/NavLink";
import { sidebar, types } from "../../data";
import performanceIcon from "../../public/images/performance_icon.png";

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

export default function Markers() {
  // Navigation
  const router = useRouter();
  const type = router.query.type ?? "all";
  // Internationalization
  const { t } = useTranslation();

  // Test
  const zoom = 6;
  const tileSize = 256;
  const mapSize = tileSize * Math.pow(2, zoom);
  const mapCenter = mapSize / 2;
  const markers = typeSplitter([
    {
      id: 1,
      type: "temtem",
      coordinates: [mapCenter, mapCenter],
    },
    {
      id: 2,
      type: "saipark",
      coordinates: [mapCenter + 500, mapCenter],
    },
    {
      id: 3,
      type: "landmark",
      coordinates: [mapCenter - 500, mapCenter],
    },
  ]);

  return (
    <>
      {/* Sidebar menu */}
      <aside
        className="space-y-2 overflow-y-scroll bg-gray-900 p-3 scrollbar-hide"
        onDragStart={(e) => e.preventDefault()}
      >
        {/* Marker type filters */}
        {sidebar.map((item, i) => (
          <NavLink key={i} href={item.href}>
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
        <hr className="mx-2 rounded border-t-2 border-t-white/[0.06]" />

        {/* Logout button */}
        <NavLink href="/login">
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

      {/* Marker list */}
      <div className="w-96 overflow-y-scroll bg-gray-800 scrollbar-hide">
        <div className="flex w-full flex-col">
          {types[type].map((marker) => (
            <p key={marker}>{marker}</p>
          ))}
        </div>
      </div>

      {/* Airborne Archipelago map */}
      <Map
        markers={types[type]
          .map((type) => {
            return markers[type];
          })
          .flat()}
      />
    </>
  );
}
