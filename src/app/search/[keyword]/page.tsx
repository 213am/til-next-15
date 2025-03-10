import { notFound } from "next/navigation";

// 검색 페이지
export default function Page({
  params,
  searchParams,
}: {
  params: { keyword?: string }; // 동적 라우트 파라미터
  searchParams: { keyword?: string }; // 쿼리 파라미터
}) {
  // 잘못된 경로 (`/search/gogo`) 또는 검색어가 없는 경우 404로 이동
  if (
    params.keyword ||
    !searchParams.keyword ||
    searchParams.keyword.trim() === ""
  ) {
    notFound();
  }

  console.log({ keyword: searchParams.keyword });

  return <div>{searchParams.keyword}에 대한 검색결과</div>;
}
