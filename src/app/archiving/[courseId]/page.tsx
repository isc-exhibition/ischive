/* 
archiving/[courseId]/page.tsx:
  A server-side page for each course in /archiving
*/

import { courses } from "@/api/courses";
import ArchivingCourse from "./ArchivingCourse";

function getCourseIds() {
  let courseIds: any[] = [];
  Object.keys(courses.entire).map((track) => {
    const coursesOfTrack = courses.entire[track];
    coursesOfTrack.forEach((course) =>
      courseIds.push({ courseId: course.courseId.toString() }),
    );
  });
  return courseIds;
}

export async function generateStaticParams() {
  const courseIds = getCourseIds();
  return courseIds;
}

export default function Page({ params }: { params: { courseId: string } }) {
  const { courseId } = params;
  return <ArchivingCourse params={{ courseId: params.courseId }} />;
}
