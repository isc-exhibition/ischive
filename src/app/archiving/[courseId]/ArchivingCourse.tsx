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
} from "@/api/fetch";
import { courses } from "@/api/courses";
import AssignmentsContainer from "@/components/AssignmentsContainer/AssignmentsContainer";
import Layout from "@/components/Layout/Layout";
import SemesterSelect from "@/components/SemesterSelect/SemesterSelect";
import Image from "next/image";
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

  // 학기별 과제물을 렌더링하는 함수(템플릿)
  const renderSemesterInfo = (
    semester: string,
    filteredAssignments: AssignmentType[],
  ) => {
    const [year, term] = semester.split("-");
    return (
      <div key={semester} className="mb-10">
        <h2 className="mx-0 mb-2">{`${year}학년도 ${term}학기`}</h2>
        <p>{`지도교수 | ${courseInfo.professors[semester]}`}</p>
        {filteredAssignments.length > 0 ? (
          <AssignmentsContainer assignments={filteredAssignments} />
        ) : (
          <p className="mt-5 font-bold">업로드된 과제물이 없습니다.</p>
        )}
      </div>
    );
  };

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
          <h4 className="text-[#FF5C00]">
            {courseInfo.track === "# Project"
              ? courseInfo.track
              : courseInfo.track.slice(0, -6)}
          </h4>
        </div>
        {/* back button */}
        <Image
          src={"/assets/img/back_orange.png"}
          width={0}
          height={0}
          sizes="20vw"
          alt="back-orange"
          className="w-10 cursor-pointer md:w-12"
          onClick={() => router.back()}
        />
      </div>

      {/* div: a container for assignments */}
      <div className="border-t-2 border-solid border-black p-8 font-Pretendard md:p-10">
        {semesters
          .filter((semester) => {
            return (
              selectedSemester === "entire" || semester === selectedSemester
            );
          })
          .map((semester) => {
            const filteredAssignments = assignments.filter(
              (assignment) =>
                `${assignment.year}-${assignment.semester}` === semester,
            );

            if (courseInfo.professors[semester]) {
              return renderSemesterInfo(semester, filteredAssignments);
            } else if (selectedSemester !== "entire") {
              // '전체 학기'가 아닐 때, 강좌가 열리지 않은 학기를 나타내기 위한 렌더링
              return (
                <div key={semester}>
                  <p className="text-lg font-bold">
                    해당 학기에 강좌가 열리지 않았습니다.
                  </p>
                </div>
              );
            }
          })}
      </div>
    </Layout>
  );
}
