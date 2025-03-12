import style from "@/app/good/[id]/page.module.css";
import { IGoodDataType } from "@/types/types";
import Image from "next/image";
import { notFound } from "next/navigation";

// 특정한 페이지를 Static Page 로 생성
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let good: IGoodDataType | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      {
        cache: "force-cache",
      }
    );
    good = await res.json();
  } catch (error) {
    console.log(error);
  }

  if (!good) {
    notFound(); // 404 page
    // return <div>존재하지 않는 상품입니다</div>;/
  }

  const { title, image, category, rating, description, price } = good;

  return (
    <div className={style.container}>
      <section>
        <div className={style.title}>{title}</div>
        <div className={style.price}>$ {price}</div>
      </section>
      <div className={style.image} style={{ backgroundImage: `url(${image})` }}>
        <Image src={image} width={245} height={350} alt={title} />
      </div>
      <div className={style.category}>{category}</div>
      <div className={style.rating}>
        Rating : {rating.rate} / {rating.count}
      </div>

      <div className={style.description}>{description}</div>
    </div>
  );
}
