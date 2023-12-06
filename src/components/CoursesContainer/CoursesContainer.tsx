import { CourseType } from "@/api/courses";

function CourseContainer({ course }: { course: CourseType }) {
  return (
    <button className="my-2 mr-2 rounded-3xl border border-solid border-black px-7 py-2 font-Pretendard">
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
