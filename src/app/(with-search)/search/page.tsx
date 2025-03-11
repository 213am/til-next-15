import style from "@/app/(with-search)/search/page.module.css";
import GoodItem from "@/components/GoodItem";
import goods from "@/mock/good.json";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string }>;
}) {
  const { keyword } = await searchParams;
  console.log(keyword);

  return (
    <div className={style.container}>
      <h4>
        <strong>{keyword}</strong> 에 대한 검색페이지
      </h4>
      <div>
        {goods.map((item) => (
          <GoodItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
