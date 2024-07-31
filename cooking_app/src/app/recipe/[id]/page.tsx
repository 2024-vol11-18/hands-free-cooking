"use client";

import Image from "next/image";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { usePathname } from "next/navigation";

export default function Recipe() {
    //パスパラメータ(/recipe/[id])の取得
    console.log(usePathname());
    return (
    <>
        <p>here is /recipe page</p>
    </>
    )
}