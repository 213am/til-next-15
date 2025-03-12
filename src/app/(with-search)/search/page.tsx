import style from "@/app/(with-search)/search/page.module.css";
import GoodItem from "@/components/GoodItem";
import { IGoodDataType } from "@/types/types";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string }>;
}) {
  const { keyword } = await searchParams;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/category/${keyword}`
  );
  const goods: IGoodDataType[] = await res.json();

  if (goods.length === 0) {
    return (
      <div>
        <strong>{keyword}</strong> 카테고리에 해당하는 제품이 없습니다
      </div>
    );
  }

  return (
    <div className={style.container}>
      <h4>
        카테고리명 : <strong>{keyword}</strong> 에 대한 검색페이지
      </h4>
      <div>
        {goods.map((item) => (
          <GoodItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
