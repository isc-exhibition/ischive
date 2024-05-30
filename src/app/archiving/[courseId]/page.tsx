/* 
archiving/[courseId]/page.tsx:
  A server-side page for each course in /archiving
*/

import { fetchAssignments, fetchCourseInfo } from "@/api/fetch";
import ArchivingCourse from "./ArchivingCourse";
import Layout from "@/components/Layout/Layout";

export default async function Page({
  params,
}: {
  params: { courseId: string };
}) {
  const { courseId } = params;

  const courseInfo = await fetchCourseInfo(parseInt(courseId));

  if (!courseInfo) {
    return (
      <Layout>
        <h2>LOADING...</h2>
      </Layout>
    );
  }

  const assignments = await fetchAssignments(
    courseInfo.courseId,
    courseInfo.name,
  );

  return (
    <Layout>
      {/* h1: COURSE */}
      <h1>C0URSE</h1>
      <ArchivingCourse courseInfo={courseInfo} assignments={assignments} />
    </Layout>
  );
}
