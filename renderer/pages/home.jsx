import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/map"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="h-screen w-full bg-[#393943]">
      <Map />
    </div>
  );
}
