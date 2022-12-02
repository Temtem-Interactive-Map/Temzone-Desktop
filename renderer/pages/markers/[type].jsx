import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Discover from "../../components/Discover";
import Sidebar from "../../components/Sidebar";

const Map = dynamic(() => import("../../components/Map"), {
  ssr: false,
});

export default function Markers() {
  const router = useRouter();
  const type = router.query.type;

  return (
    <>
      <Sidebar />
      <Discover type={type} />
      <Map />
    </>
  );
}
