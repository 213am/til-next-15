import { GoodDataType } from "@/types/types";
import GoodItem from "./GoodItem";

export default async function AllGoods() {
  let allGoods: GoodDataType[] = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?limit=10`,
      { next: { revalidate: 10 } }
    );
    allGoods = await res.json();
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      {allGoods.map((item) => (
        <GoodItem key={item.id} {...item} />
      ))}
    </>
  );
}
