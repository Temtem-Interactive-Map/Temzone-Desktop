import Image from "next/image";
import { IoExitOutline } from "react-icons/io5";
import { sidebar } from "../../data";
import NavLink from "../NavLink";

export default function Sidebar() {
  return (
    <aside className="space-y-2 overflow-y-scroll bg-gray-900 p-3 scrollbar-hide">
      {sidebar.map((item) => (
        <NavLink href={item.href} key={item.label}>
          <Image
            src={item.image}
            alt={item.label}
            width={40}
            height={40}
            quality={100}
          />
        </NavLink>
      ))}

      <hr className="mx-2 rounded border-t-2 border-t-white/[0.06]" />

      <NavLink href="/login">
        <IoExitOutline className="h-8 w-8" />
      </NavLink>
    </aside>
  );
}
