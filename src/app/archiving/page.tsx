/* 
archiving/page.tsx:
  Describes /archiving
  Shows all tracks and courses
*/

"use client";

import Layout from "@/components/Layout/Layout";
import SemesterSelect from "@/components/SemesterSelect/SemesterSelect";
import { courses, CoursesKey, CoursesType } from "../../api/courses";
import { useEffect, useState } from "react";
import CoursesContainer from "@/components/CoursesContainer/CoursesContainer";
import { useRouter, useSearchParams } from "next/navigation";
import keyValidator from "@/utils/keyValidator";

export default function Archiving() {
  const params = useSearchParams();
  const router = useRouter();

  const semesterQuery = params.get("semester");

  const [selectedSemester, setSelectedSemester] = useState<CoursesKey>(
    // if semesterQuery is in courses, return semesterQuery. else return "entire"
    keyValidator(semesterQuery, courses, "entire"),
  );

  const selectedCourses = courses[selectedSemester];

  useEffect(() => {
    router.replace(`/archiving?semester=${selectedSemester}`);
  }, [selectedSemester]);

  return (
    <Layout>
      {/* h1: ROADMAP */}
      <h1>R0ADMAP</h1>
      {/* SemesterSelect: dropdown select box */}
      <div className="border-t-2 border-solid border-black">
        <SemesterSelect
          selectedSemester={selectedSemester}
          /* set selectedSemester and selectedCourses to the changed value */
          onSelectionChange={(value) => {
            setSelectedSemester(value);
          }}
        />
      </div>
      {/* div: container for HCI track and courses */}
      <div className="border-t-2 border-solid border-black pl-10 pt-10">
        <h4 className="mb-2"># HCI Track</h4>
        <CoursesContainer courses={selectedCourses["hci"]} />
      </div>
      {/* div: container for Media & Contents track and courses */}
      <div className="pl-10 pt-10">
        <h4 className="mb-2"># Media & Contents Track</h4>
        <CoursesContainer courses={selectedCourses["mediaContents"]} />
      </div>
      {/* div: container for Technology track and courses */}
      <div className="pl-10 pt-10">
        <h4 className="mb-2"># Technology Track</h4>
        <CoursesContainer courses={selectedCourses["technology"]} />
      </div>
      {/* div: container for Project track and courses */}
      <div className="px-10 py-10">
        <h4 className="mb-2"># Project</h4>
        <CoursesContainer courses={selectedCourses["project"]} />
      </div>
    </Layout>
  );
}
