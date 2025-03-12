import { IGoodDataType } from "@/types/types";
import GoodItem from "./GoodItem";

export default async function RandomGoods() {
  let randomGoods: IGoodDataType[] = [];
  try {
    const resRandom = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?limit=3`,
      { next: { revalidate: 3 } }
    );
    randomGoods = await resRandom.json();
  } catch (error) {
    console.log(error);
  }

  if (randomGoods.length === 0) {
    return <div>상품이 없습니다</div>;
  }

  return (
    <>
      {randomGoods.map((item) => (
        <GoodItem key={item.id} {...item} />
      ))}
    </>
  );
}
