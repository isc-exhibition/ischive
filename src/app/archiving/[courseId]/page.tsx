/* 
archiving/[courseId]/page.tsx:
  A server-side page for each course in /archiving
*/

import { courses } from "@/api/courses";
import ArchivingCourse from "./ArchivingCourse";

export default function Page({ params }: { params: { courseId: string } }) {
  return <ArchivingCourse params={{ courseId: params.courseId }} />;
}
