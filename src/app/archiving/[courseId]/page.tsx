/* 
archiving/[courseId]/page.tsx:
    A page for each course in /archiving
*/

import {
  CourseInfoType,
  fetchCourseInfo,
  fetchAssignments,
  AssignmentType,
} from "@/api/assignments";
import { courses } from "@/api/courses";
import AssignmentsContainer from "@/components/AssignmentsContainer/AssignmentsContainer";
import Layout from "@/components/Layout/Layout";
import SemesterSelect from "@/components/SemesterSelect/SemesterSelect";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  let courseIds = [];
  for (let i = 1; i <= 26; i++) {
    courseIds.push({ courseId: i.toString() });
  }
  return courseIds;
}

export default async function ArchivingCourse({
  params,
}: {
  params: { courseId: string };
}) {
  // extract semesters from courses
  const semesters = Object.keys(courses).slice(1);

  // extract courseId from slug
  const courseId: number = parseInt(params.courseId);

  // a semester selected by SemesterSelect

  // fetch course info by using Google Sheet API
  const courseInfo: CourseInfoType = await fetchCourseInfo(courseId);

  // fetch assignments by using Google Sheetp API
  const assignments: AssignmentType[] = await fetchAssignments(courseInfo.name);

  return (
    <Layout>
      {/* h1: COURSE */}
      <h1>C0URSE</h1>

      {/* <div className="border-t-2 border-solid border-black">
        <SemesterSelect
          onSelectionChange={(value) => setSelectedSemester(value)}
        />
      </div> */}

      {/* div: a container for course name, track, and back button */}
      <div className="flex flex-row items-center justify-between border-t-2 border-solid border-black">
        {/* course name and track */}
        <div className="flex flex-row items-center">
          <h2>{courseInfo.name}</h2>
          <h4 className="ml-6 text-[#FF5C00]">{courseInfo.track}</h4>
        </div>
        {/* back button */}
        <Link href="/archiving">
          <Image
            src={"/assets/img/back_orange.png"}
            width={0}
            height={0}
            sizes="100vw"
            alt="back-orange"
            className="w-10 md:w-12"
          />
        </Link>
      </div>

      {/* div: a container for assignments */}
      <div className="border-t-2 border-solid border-black p-8 font-Pretendard md:p-10">
        {semesters.map((semester) => {
          if (semester != "entire") {
            // filter assignments by semesters
            const filteredAssignments = assignments.filter(
              (assignment) =>
                `${assignment.year}-${assignment.semester}` === semester,
            );

            // semester's index in semesters
            const semesterIndex = semesters.findIndex(
              (elem) => elem === semester,
            );

            if (courseInfo.professors[semesterIndex] != "") {
              return (
                /* div: a container for assignments in each semester */
                <div key={semester} className="mb-10">
                  {/* h2: semester */}
                  <h2 className="mx-0 mb-2">{`${semester.split("-")[0]}학년도 ${
                    semester.split("-")[1]
                  }학기`}</h2>
                  {/* p: professor */}
                  <p>{`지도교수 | ${courseInfo.professors[semesterIndex]}`}</p>
                  {/* AssignmentsContainer */}
                  <AssignmentsContainer assignments={filteredAssignments} />
                </div>
              );
            }
          }
        })}
      </div>
    </Layout>
  );
}
