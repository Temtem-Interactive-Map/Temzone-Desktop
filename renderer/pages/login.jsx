import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    router.push("/markers/all");
  });

  return (
    <>
      <Link href="/markers/all" className="text-black">
        LOGIN
      </Link>
    </>
  );
}
