/* 
archiving/[courseId]/page.tsx:
  A server-side page for each course in /archiving
*/

import { fetchAssignments, fetchCourseInfo } from "@/api/fetch";
import ArchivingCourse from "./ArchivingCourse";
import Layout from "@/components/Layout/Layout";
import keyValidator from "@/utils/keyValidator";
import { courses } from "@/api/courses";

export default async function Page({
  params,
  searchParams,
}: {
  params: { courseId: string };
  searchParams: {
    semester: string;
  };
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

  const semesterQuery = searchParams.semester;

  const semester = keyValidator(semesterQuery, courses, "entire");

  return (
    <Layout>
      {/* h1: COURSE */}
      <h1>C0URSE</h1>
      <ArchivingCourse
        courseInfo={courseInfo}
        assignments={assignments}
        initialSemester={semester}
      />
    </Layout>
  );
}
