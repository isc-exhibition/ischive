/* 
SemesterSelect.tsx:
    A select box used in /archiving and /course
*/

"use client";

import { useState } from "react";

export default function SemesterSelect() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-row items-center font-Pretendard text-2xl font-extrabold md:text-3xl">
      <div className="border-r-2 border-solid border-black ">
        <select
          className="appearance-none border-r-2 border-solid border-black px-16"
          onFocus={() => setIsFocused(true)}
          onChange={() => setIsFocused(false)}
          onBlur={() => setIsFocused(false)}
        >
          <option value={0}>전체 학기</option>
          <option value={1}>2023-1</option>
          <option value={2}>2022-2</option>
          <option value={3}>2022-1</option>
        </select>
        <span className="px-3 text-lg">{isFocused ? "▲" : "▼"}</span>
      </div>
    </div>
  );
}
