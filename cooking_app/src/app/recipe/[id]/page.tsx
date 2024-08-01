"use client";

import useSWR from "swr";

// データ取得用のフェッチャー関数
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Recipe({ id }) {
    // SWRフックを使って、指定されたレシピIDからデータを取得
    const { data, error } = useSWR(`/api/recipe/${id}`, fetcher);

    if (error) return <p>データの取得に失敗しました</p>;
    if (!data) return <p>データを読み込み中...</p>;

// import useSWRMutation from "swr/mutation";
// import { usePathname } from "next/navigation";

// export default function Recipe() {
//     //パスパラメータ(/recipe/[id])の取得
//     console.log(usePathname());
// >>>>>>> c78e6d68e9bee7671e0ceb4a62dec987912be26a:cooking_app/src/app/recipe/[id]/page.tsx
    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.description}</p>
        </div>
    );
}
