/* 
CoursesContainer.tsx:
  A container that contains CourseButtons
*/

import { CourseType } from "@/api/courses";

function CourseButton({ course }: { course: CourseType }) {
  return (
    <button className="my-2 mr-2 rounded-3xl border border-solid border-black px-6 py-2 font-Pretendard text-sm hover:border-[#FF5C00] hover:bg-[#FF5C00] hover:text-white md:text-base">
      {course.name}
    </button>
  );
}

export default function CoursesContainer({
  courses,
}: {
  courses: Array<CourseType>;
}) {
  return courses.map((item) => (
    <CourseButton course={item} key={item.courseId} />
  ));
}
