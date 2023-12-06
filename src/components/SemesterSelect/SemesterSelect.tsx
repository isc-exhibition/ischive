/* 
SemesterSelect.tsx:
    A select box used in /archiving and /course
*/

"use client";

import { useState } from "react";

export default function SemesterSelect({
  /* callback function to send changed value to outside */
  onSelectionChange,
}: {
  onSelectionChange?: (value: string) => void;
}) {
  // selectedSemester: value of the select box
  const [selectedSemester, setSelectedSemester] = useState("0");
  // isFocused: true when the select box is focused
  const [isFocused, setIsFocused] = useState(false);

  // handler for onChange event on select
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedSemester(newValue);
    setIsFocused(false);
    onSelectionChange?.(newValue); // send newValue to onSelectionChange function
  };

  return (
    <div className="flex flex-row items-center font-Pretendard text-2xl font-extrabold md:text-3xl">
      <div className="border-r-2 border-solid border-black ">
        <select
          className="appearance-none border-r-2 border-solid border-black px-16"
          onFocus={() => setIsFocused(true)} // true when focused
          onChange={handleChange} // handleChange when changed
          onBlur={() => setIsFocused(false)} // false when blurred
          value={selectedSemester}
        >
          {/* value: entire, 2023-2, 2023-1, ... */}
          <option value={"entire"}>전체 학기</option>
          <option value={"2023-1"}>2023-1</option>
          <option value={"2022-2"}>2022-2</option>
          <option value={"2022-1"}>2022-1</option>
        </select>
        <span className="px-3 text-lg">{isFocused ? "▲" : "▼"}</span>
      </div>
    </div>
  );
}
