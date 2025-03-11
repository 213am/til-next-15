"use client";
import { useRouter } from "next/navigation"; // app router 방식
import { ChangeEvent, KeyboardEvent, useState } from "react";
import style from "@/components/searchbar.module.css";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // 동적 라우팅
  const router = useRouter(); // import 주의
  const searchHandler = () => {
    if (!search) {
      return;
    }
    router.push(`/search?keyword=${search}`);
  };

  const pressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchHandler();
    }
  };

  return (
    <div className={style.container}>
      <input
        type="text"
        value={search}
        onChange={(e) => onChangeSearch(e)}
        onKeyDown={(e) => pressEnterHandler(e)}
      />
      <button onClick={searchHandler}>검색</button>
    </div>
  );
};
export default SearchBar;
