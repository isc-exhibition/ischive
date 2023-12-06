/* 
archiving/page.tsx:
  Describes /archiving
  Shows all tracks and courses
*/

"use client";

import Layout from "@/components/Layout/Layout";
import SemesterSelect from "@/components/SemesterSelect/SemesterSelect";
import { courses, TrackType } from "../api/courses";
import { useState } from "react";
import CoursesContainer from "@/components/CoursesContainer/CoursesContainer";

export default function Page() {
  const [selectedSemester, setSelectedSemester] = useState<string>("entire");
  const [selectedCourses, setSelectedCourses] = useState<TrackType>(
    courses["entire"],
  );

  return (
    <Layout>
      {/* h1: ROADMAP */}
      <h1>R0ADMAP</h1>
      {/* SemesterSelect: dropdown select box */}
      <div className="border-t-2 border-solid border-black">
        <SemesterSelect
          /* set selectedSemester and selectedCourses to the changed value */
          onSelectionChange={(value) => {
            setSelectedSemester(value);
            setSelectedCourses(courses[value]);
          }}
        />
      </div>
      {/* div: container for HCI tracks and courses */}
      <div className="border-t-2 border-solid border-black px-10 py-10">
        <h4># HCI Track</h4>
        <CoursesContainer courses={selectedCourses["hci"]} />
      </div>
      {/* div: container for Media & Contents tracks and courses */}
      <div className="px-10 py-10">
        <h4># Media & Contents Track</h4>
      </div>
      {/* div: container for Technology tracks and courses */}
      <div className="px-10 py-10">
        <h4># Technology Track</h4>
      </div>
      {/* div: container for Project tracks and courses */}
      <div className="px-10 py-10">
        <h4># Project</h4>
      </div>
    </Layout>
  );
}
