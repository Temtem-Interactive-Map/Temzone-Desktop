import Image from "next/image";
import { IoExitOutline } from "react-icons/io5";
import { sidebar } from "../../data";
import NavLink from "../NavLink";

export default function Sidebar() {
  return (
    <aside
      aria-label="Sidebar"
      className="space-y-2 overflow-y-scroll bg-gray-900 p-3 scrollbar-hide"
    >
      {sidebar.map((item) => (
        <NavLink key={item.label} active={item.active}>
          <Image src={item.image} alt={item.label} width={40} height={40} />
        </NavLink>
      ))}

      <hr className="mx-2 rounded border-t-2 border-t-white/[0.06]" />

      <NavLink active={false}>
        <IoExitOutline className="h-8 w-8" />
      </NavLink>
    </aside>
  );
}
