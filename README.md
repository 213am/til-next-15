# Data Fetching

- 사용자가 페이지 요청 시 데이터를 사전에 호출하여 처리

## 복습

### 흐름

- 사용자가 라우터 요청 > Next 서버가 html 에 필요한 데이터 > BackEnd 에 요청
- Next 서버가 완성된 html 을 반환 > 만약, 클라이언트 컴포넌트가 있다면
- 클라이언트 컴포넌트만 번들링한 js 를 돌려주고, 다시 Hydration 과정을 진행

### Pages Router 의 경우

- SSR ( Server Side Rendering ) : getServerSideProps 함수
- SSG ( Server Static Generation ) : getStaticProps 함수
- ISR ( Incremental Static Regeneration ) : getStaticProps 함수 + revalidate 옵션
- 동적 라우터를 위해 필요한 함수 : getStaticPaths 함수

#### 단점

- 위의 함수들은 무조건 라우터 경로에 맞는 페이지에만 작성가능

  - `http://localhost:3000/setting` => `/src/pages/setting.tsx`

- 일반 컴포넌트는 Props 로 전달받는 방법 또는 Context 를 이용하는 방법이 필요

### App Router 의 경우

- 서버 컴포넌트라면 마음대로 데이터를 패칭할 수 있도록 함

## index 페이지 데이터 패칭 적용

- /src/app/(with-search)/page.tsx

```tsx
import style from "@/app/(with-search)/page.module.css";
import GoodItem from "@/components/GoodItem";
import { IGoodDataType } from "@/types/types";

export default async function Home() {
  const res = await fetch("https://fakestoreapi.com/products");
  const allGoods: IGoodDataType[] = await res.json();
  console.log(allGoods);

  const resRandom = await fetch("https://fakestoreapi.com/products");
  const randomGoods: IGoodDataType[] = await resRandom.json();
  console.log(randomGoods);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 상품</h3>
        {randomGoods.map((item) => (
          <GoodItem key={item.id} {...item} />
        ))}
      </section>
      <section>
        <h3>전체 상품</h3>
        {allGoods.map((item) => (
          <GoodItem key={item.id} {...item} />
        ))}
      </section>
    </div>
  );
}
```

- 페이지가 아닌 컴포넌트에서도 데이터 패칭이 가능

- /src/components/AllGoods.tsx

```tsx
import { IGoodDataType } from "@/types/types";
import GoodItem from "./GoodItem";

export default async function AllGoods() {
  const res = await fetch("https://fakestoreapi.com/products?limit=10");
  const allGoods: IGoodDataType[] = await res.json();

  return (
    <>
      {allGoods.map((item) => (
        <GoodItem key={item.id} {...item} />
      ))}
    </>
  );
}
```

- /src/components/RandomGoods.tsx

```tsx
import { IGoodDataType } from "@/types/types";
import GoodItem from "./GoodItem";

export default async function RandomGoods() {
  const resRandom = await fetch("https://fakestoreapi.com/products?limit=3");
  const randomGoods: IGoodDataType[] = await resRandom.json();

  return (
    <>
      {randomGoods.map((item) => (
        <GoodItem key={item.id} {...item} />
      ))}
    </>
  );
}
```

- /src/app/(with-search)/page.tsx

```tsx
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
```

- BE 의 API 주소를 .env 에 환경설정파일로 저장

  - 환경설정 파일이 웹브라우저에 노출이 되는 경우
    `NEXT_PUBLIC_API_URL=https://fakestoreapi.com`
    `${process.env.NEXT_PUBLIC_API_URL}`

  - 환경설정 파일이 서버에서만 활용되는 경우
    `API_URL=https://fakestoreapi.com`
    `${process.env.NEXT_PUBLIC_API_URL}`

## search 페이지 데이터 패칭 적용

- search 는 사용자가 무엇을 검색할 지 알 수 없으므로 데이터 패칭은 부적합
- /src/app/(with-search)/search/page.tsx

```tsx
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
```

## 상세 페이지 테이터 패칭 적용

- /src/app/good/[id]/page.tsx

```tsx
import style from "@/app/good/[id]/page.module.css";
import { IGoodDataType } from "@/types/types";
import Image from "next/image";

const mockData: IGoodDataType = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: { rate: 3.9, count: 120 },
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let good: IGoodDataType | null = null;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
    );
    good = await res.json();
  } catch (error) {
    console.log(error);
  }

  if (!good) {
    return <div>존재하지 않는 상품입니다</div>;
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
```

# Data Caching

- 서버가 실행되는 동안에 요청된 데이터를 서버에 보관하는 것

## 전제조건

- Next.js 의 fetch 를 사용한다
- fetch("API", {cache 옵션})

## 종류

- `{ cache: "no-store" }` : 보관하지 말아라
- `{ cache: "force-cache" }` : 무조건 보관하라
- `{ next: { revalidate: 3 } }` : 요청 시 3초 동안만 유지하고 갱신
- `{ next: { tags: [ 'num' ] } }` : 특정 태그로 강제 요청

## 실제 Next 서버에서 API 호출을 하는 과정을 출력

- `next.config.ts` 설정

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
    ],
  },
  // BE API 호출 시 과정 및 Data cache 정보
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
```

### cache: "force-cache"

- /src/components/AllGoods.tsx

```tsx
import { IGoodDataType } from "@/types/types";
import GoodItem from "./GoodItem";

export default async function AllGoods() {
  let allGoods: IGoodDataType[] = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?limit=10`,
      { cache: "force-cache" }
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
```

## next: { revalidate: 3 }

- /src/components/RandomGoods.tsx

```tsx
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
```

## 동적 라우팅 페이지

- /src/app/good/[id]/page.tsx

```tsx
import style from "@/app/good/[id]/page.module.css";
import { IGoodDataType } from "@/types/types";
import Image from "next/image";

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
    return <div>존재하지 않는 상품입니다</div>;
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
```

# Full Route Cache - 라우터 캐싱

- `npm run build` 시 생성
- 이후로 요청 시 사전렌더링 없이 바로 cache 된 내용을 반환

## 페이지 종류

- Static Page : Full Route Cache 적용

- Dynamic Page : 동적 생성

### Dynamic Page 가 되는 경우

- 요청 마다 결과 내용이 다를 때 : Data Fetching 을 한다면
- 쿼리 또는 파라미터를 전달 받는 경우

### Static Page 가 되는 경우

- 동적함수 없고, 데이터 캐시가 적용된 경우

#### 실습예제) 동적 라우터 페이지를 Static Page 로 만들기

- /src/app/good/[id]/page.tsx

```tsx
import style from "@/app/good/[id]/page.module.css";
import { IGoodDataType } from "@/types/types";
import Image from "next/image";

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
    return <div>존재하지 않는 상품입니다</div>;
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
```
