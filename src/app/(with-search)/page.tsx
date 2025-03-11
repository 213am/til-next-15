import good from "@/mock/good.json";
import style from "@/app/(with-search)/page.module.css";
import GoodItem from "@/components/GoodItem";

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 상품</h3>
        {good.map((item) => (
          <GoodItem key={item.id} {...item} />
        ))}
      </section>
      <section>
        <h3>전체 상품</h3>
        {good.map((item) => (
          <GoodItem key={item.id} {...item} />
        ))}
      </section>
    </div>
  );
}
