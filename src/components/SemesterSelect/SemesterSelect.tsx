import { useState, useRef, useEffect } from "react";
import { CoursesKey, courses, getSemesterName } from "@/api/courses";

export default function SemesterSelect({
  onSelectionChange,
  selectedSemester,
}: {
  selectedSemester: CoursesKey;
  onSelectionChange: (value: CoursesKey) => void;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // ["entire", "2023-2", "2023-1", ...]
  const semesters = Object.keys(courses) as Array<CoursesKey>;

  // semester를 받아서 해당하는 학기 이름을 반환하는 함수
  // entire를 전체학기 로 변환하기 위해 getSemesterName 함수를 사용했습니다.
  const renderSemesterName = (semester: CoursesKey) =>
    getSemesterName(semester);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      className="relative flex h-9 select-none items-center font-Pretendard text-2xl font-extrabold md:text-3xl"
    >
      <div
        className="w-56 cursor-pointer appearance-none border-r-2 border-solid border-black text-center"
        onClick={() => {
          setIsFocused(!isFocused);
        }}
      >
        <p>{renderSemesterName(selectedSemester)}</p>
      </div>
      {isFocused && (
        <div
          className="appearnce-none absolute left-0 cursor-pointer bg-white"
          style={{ top: "38px", zIndex: 9999 }}
        >
          {semesters.map((semester, index) => (
            <div
              className="w-56 border-b-2 border-r-2 border-solid border-black text-center hover:bg-black hover:text-white"
              key={index}
              onClick={() => {
                setIsFocused(false);
                onSelectionChange(semesters[index]);
              }}
            >
              {renderSemesterName(semester)}
            </div>
          ))}
        </div>
      )}
      <div
        className="flex h-full cursor-pointer appearance-none items-center justify-center border-r-2 border-solid border-black px-3 text-lg"
        onClick={() => {
          setIsFocused(!isFocused);
        }}
      >
        {isFocused ? "▲" : "▼"}
      </div>
    </div>
  );
}
