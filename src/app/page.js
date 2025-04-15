'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { showLoader } from "./lib/common";

export default function Home() {
  const router = useRouter()
  useEffect(()=>{
    showLoader()
    router.push('/consumer')
  },[])
  return <></>;
}
