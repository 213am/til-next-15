import { GoodDataType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import style from "@/components/GoodItem.module.css";

const GoodItem = ({ id, title, image, category, rating }: GoodDataType) => {
  return (
    <Link href={`/good/${id}`} className={style.container}>
      <div>
        <Image src={image} alt={title} width={100} height={115} />
      </div>
      <div>
        <div className={style.title}>{title}</div>
        <div className={style.category}>{category}</div>
        <br />
        <div className={style.rating}>
          Rating : {rating.rate} / {rating.count}
        </div>
      </div>
    </Link>
  );
};
export default GoodItem;
