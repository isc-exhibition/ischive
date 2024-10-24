import React, { Suspense } from "react";
import { CourseType, courses } from "@/api/courses";
import keyValidator from "@/utils/keyValidator";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function CourseButton({ course }: { course: CourseType }) {
  const query = useSearchParams();

  const semester = query.get("semester");

  const href = semester
    ? `/archiving/${course.courseId}?semester=${keyValidator(
        semester,
        courses,
        "entire",
      )}`
    : `/archiving/${course.courseId}`;

  return (
    <Link href={href}>
      <button className="my-2 mr-2 rounded-3xl border border-solid border-black px-6 py-2 font-Pretendard text-sm hover:border-[#FF5C00] hover:bg-[#FF5C00] hover:text-white md:text-base">
        {course.name}
      </button>
    </Link>
  );
}

export default function CoursesContainer({
  courses,
}: {
  courses: Array<CourseType>;
}) {
  return (
    <Suspense fallback={null}>
      {courses.map((item) => (
        <CourseButton course={item} key={item.courseId} />
      ))}
    </Suspense>
  );
}
