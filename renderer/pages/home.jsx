import dynamic from "next/dynamic";
import Discover from "../components/Discover";
import Sidebar from "../components/Sidebar";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Sidebar />
      <Discover />
      <Map />
    </>
  );
}
