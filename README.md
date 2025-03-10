# Next 15 - App Router

- [til-next-14 README.md 참고](https://github.com/213am/til-next-14/blob/main/README.md)

  - CSR
  - SSR
  - SSG
  - ISR

## 프로젝트 생성

```bash
npx create-next-app@latest .
```

- 현재 tailwind 는 설치하지 않음

  ![Image](https://github.com/user-attachments/assets/a817dab9-7ca8-4613-ab49-6e57be817029)

- 테스트
  - `npm run dev` : 개발 모드 실행
  - `npm run build` : 빌드 진행
  - `npm run start` : Production 모드 실행

## App Router

### Page Router 복습

- [til-next-14 에서 **Page Router** 와 비교해보자](https://github.com/213am/til-next-14/blob/main/README.md)
  - 예시
    - /src/**pages**/라우터명.tsx
    - /src/**pages**/borad/[id].tsx 등
    - /src/**pages**/borad/[id]/index.tsx 등

### App Router 살펴보기

- /src/**app** 폴더가 기준
  <br/>

#### 1. 일반 URI 경로 처리

- http://localhost:3000/
  - /src/**app**/page.tsx

```tsx
import styles from "./page.module.css";

export default function Home() {
  return <div className={styles.page}>인덱스 페이지</div>;
}
```

#### 2. URI 의 query 처리

- http://localhost:3000/search
  - /src/`app/search/page.tsx`

```tsx
export default function Page() {
  return <div>검색페이지</div>;
}
```

- http://localhost:3000/search?keyword=iu
  - query 전달

```tsx
// query 처리하기
// 아래는 query 를 서버에서 읽어들여서 처리하는 방법
// 예시 http://localhost:3000/search?keyword=iu
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string }>;
}) {
  const { keyword } = await searchParams;
  console.log({ keyword });

  return <div>{keyword}에 대한 검색결과</div>;
}
```

- 기본적으로 Next 에서는 `서버컴포넌트`가 됨
- console.log 실행 시 터미널(서버)에서 출력됨
  ![Image](https://github.com/user-attachments/assets/4c843db1-3fa8-4cc3-907d-4cacc8dce5c6)

- 개발 중일 때만 F12(개발자도구) console 에 출력됨
  ![Image](https://github.com/user-attachments/assets/74759b8d-7932-455d-8ebf-e3f136410afb)

#### 3. URI 의 params 처리

- http://localhost:3000/good
  - /src/`app/good/page.tsx`

```tsx
export default function Page() {
  return <div>제품 페이지</div>;
}
```

- http://localhost:3000/good/1
  - /src/`app/good/1/page/tsx`
- http://localhost:3000/good/2
  - /src/`app/good/2/page/tsx`
- 위의 경우는 라우터가 동적으로 변경되야 함

  - /src/app/good/`[id]/page.tsx`

  ```tsx
  export default async function Page({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {
    const { id } = await params;
    console.log(id);

    return <div> {id}번 : 제품 상세페이지</div>;
  }
  ```

  ![Image](https://github.com/user-attachments/assets/ae2a0c88-2669-4c5c-a796-d82381907313)
  ![Image](https://github.com/user-attachments/assets/f4751432-80ef-4b76-862c-1ccf26cd6d84)

- http://localhost:3000/good/2/5/800 ( 중첩된 경우 )
  - /src/app/good/`[...id]/page.tsx`
    ![Image](https://github.com/user-attachments/assets/22a99b42-0b99-4226-8688-8cd76c532e5d)
    ![Image](https://github.com/user-attachments/assets/a1a0cc04-10eb-46e2-a96d-d9225fc418b1)

#### 4. 404 처리

- http://localhost:3000/gogo ( 존재하지 않는 경로 )
  - /src/`app/not-found.tsx` : 파일명이 중요

```tsx
export default function NotFound() {
  return <div>잘못된 경로입니다</div>;
}
```

- http://localhost:3000/search/gogo ( 존재하지 않는 경로 )
  - /src/`app/search/not-found.tsx`

```tsx
export default function NotFound() {
  return <div>query 를 불러올 수 없습니다</div>;
}
```
