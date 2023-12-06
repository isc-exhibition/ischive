import { CourseType } from "@/app/api/courses";

function CourseContainer({ course }: { course: CourseType }) {
  return (
    <button className="rounded-3xl border-2 font-Pretendard">
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
    <CourseContainer course={item} key={item.courseId} />
  ));
}
