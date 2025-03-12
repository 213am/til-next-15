import style from "@/app/(with-search)/page.module.css";
import AllGoods from "@/components/AllGoods";
import RandomGoods from "@/components/RandomGoods";

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 상품</h3>
        <RandomGoods />
      </section>
      <section>
        <h3>전체 상품</h3>
        <AllGoods />
      </section>
    </div>
  );
}
