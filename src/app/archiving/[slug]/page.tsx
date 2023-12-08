/* 
archiving/[slug]/page.tsx:
    A page for each course in /archiving
*/

import {
  CourseInfoType,
  fetchCourseInfo,
  fetchAssignments,
  AssignmentType,
} from "@/api/assignments";
import { courses } from "@/api/courses";
import Layout from "@/components/Layout/Layout";
import SemesterSelect from "@/components/SemesterSelect/SemesterSelect";
import Image from "next/image";
import Link from "next/link";

export default async function ArchivingCourse({
  params,
}: {
  params: { slug: string };
}) {
  // extract semesters from courses
  const semesters = Object.keys(courses);

  // extract courseId from slug
  const courseId: number = parseInt(params.slug);

  // fetch course info by using Google Sheet API
  const courseInfo: CourseInfoType = await fetchCourseInfo(courseId);

  // fetch assignments by using Google Sheetp API
  const assignments: AssignmentType[] = await fetchAssignments(courseInfo.name);

  return (
    <Layout>
      {/* h1: COURSE */}
      <h1>C0URSE</h1>
      {/* SemesterSelect: dropdown select box */}
      <div className="border-t-2 border-solid border-black">
        <SemesterSelect />
      </div>
      {/* div: a container for course name, track, and back button */}
      <div className="flex flex-row items-center justify-between border-t-2 border-solid border-black">
        {/* course name and track */}
        <div className="flex flex-row items-center">
          <h2>{courseInfo.name}</h2>
          <h4 className="ml-6 text-[#FF5C00]">{courseInfo.track}</h4>
        </div>
        {/* back button */}
        <div className="w-10 md:w-12">
          <Link href="/archiving">
            <Image
              src={"/assets/img/back_orange.png"}
              width={10000}
              height={10000}
              alt="back-orange"
            />
          </Link>
        </div>
      </div>
      {/* div: a container for assignments */}
      <div className="border-t-2 border-solid border-black p-10">
        {/* h3: semester */}
        <h2>Semester</h2>
        <div>{}</div>
      </div>
    </Layout>
  );
}
