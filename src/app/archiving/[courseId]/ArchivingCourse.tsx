/* 
archiving/[courseId]/ArchivingCourse.tsx:
    A client-side page for each course in /archiving
*/

"use client";

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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ArchivingCourse({
  params,
}: {
  params: { courseId: string };
}) {
  // router const
  const router = useRouter();

  // extract semesters from courses
  const semesters = Object.keys(courses).slice(1);

  // extract courseId from slug
  const courseId: number = parseInt(params.courseId);

  // a semester selected by SemesterSelect
  const [selectedSemester, setSelectedSemester] = useState<string>("entire");
  // courseInfo
  const [courseInfo, setCourseInfo] = useState<CourseInfoType>({
    courseId: 0,
    track: "",
    name: "",
    professors: [],
  });
  // assignments
  const [assignments, setAssignments] = useState<AssignmentType[]>([]);

  // fetch courseInfo by using fetchCourseInfo function
  useEffect(() => {
    const fetchData = async () => {
      const fetchedCourseInfo = await fetchCourseInfo(courseId);
      setCourseInfo(fetchedCourseInfo);
    };

    fetchData();
  }, [courseId]);

  // fetch assignments by using fetchAssignments function
  useEffect(() => {
    const fetchData = async () => {
      if (courseInfo.courseId != 0) {
        const fetchedAssignments = await fetchAssignments(
          courseInfo.courseId,
          courseInfo.name,
        );
        setAssignments(fetchedAssignments);
      }
    };

    fetchData();
  }, [courseInfo]);

  // if courseInfo is not loaded, return LOADING
  if (courseInfo.courseId === 0) {
    return (
      <Layout>
        <h2>LOADING...</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* h1: COURSE */}
      <h1>C0URSE</h1>
      {/* SemesterSelect: filter semesters */}
      <div className="border-t-2 border-solid border-black">
        <SemesterSelect
          onSelectionChange={(value) => setSelectedSemester(value)}
        />
      </div>
      {/* div: a container for course name, track, and back button */}
      <div className="flex flex-row items-center justify-between border-t-2 border-solid border-black">
        {/* course name and track */}
        <div className="flex flex-row items-center">
          <h2>{courseInfo.name}</h2>
          <h4 className="ml-6 text-[#FF5C00]">{courseInfo.track}</h4>
        </div>
        {/* back button */}

        <Image
          src={"/assets/img/back_orange.png"}
          width={0}
          height={0}
          sizes="100vw"
          alt="back-orange"
          className="w-10 md:w-12"
          onClick={() => router.back()}
        />
      </div>

      {/* div: a container for assignments */}
      <div className="border-t-2 border-solid border-black p-8 font-Pretendard md:p-10">
        {semesters
          .filter((semester) => {
            // filter semesters according to selectedSemester
            if (selectedSemester != "entire") {
              return semester === selectedSemester;
            } else {
              return true;
            }
          })
          .map((semester) => {
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
                    <h2 className="mx-0 mb-2">{`${
                      semester.split("-")[0]
                    }학년도 ${semester.split("-")[1]}학기`}</h2>
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
