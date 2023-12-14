/* 
archiving/[courseId]/page.tsx:
  A server-side page for each course in /archiving
*/

import ArchivingCourse from "./ArchivingCourse";

export default function Page({ params }: { params: { courseId: string } }) {
  const { courseId } = params;
  return <ArchivingCourse params={{ courseId: courseId }} />;
}
