"use client";

import React, { Suspense } from "react";
import Layout from "@/components/Layout/Layout";
import SemesterSelect from "@/components/SemesterSelect/SemesterSelect";
import { courses, CoursesKey } from "../../api/courses";
import { useEffect, useState } from "react";
import CoursesContainer from "@/components/CoursesContainer/CoursesContainer";
import { useRouter, useSearchParams } from "next/navigation";
import keyValidator from "@/utils/keyValidator";

// Create a client component that uses useSearchParams
function ArchivingContent() {
  const params = useSearchParams();
  const router = useRouter();

  const semesterQuery = params.get("semester");

  const [selectedSemester, setSelectedSemester] = useState<CoursesKey>(
    keyValidator(semesterQuery, courses, "entire"),
  );

  const selectedCourses = courses[selectedSemester];

  useEffect(() => {
    router.replace(`/archiving?semester=${selectedSemester}`);
  }, [selectedSemester, router]); // Added router to dependency array

  return (
    <>
      <h1>R0ADMAP</h1>
      <div className="border-t-2 border-solid border-black">
        <SemesterSelect
          selectedSemester={selectedSemester}
          onSelectionChange={(value) => setSelectedSemester(value)}
        />
      </div>
      <div className="border-t-2 border-solid border-black pl-10 pt-10">
        <h4 className="mb-2"># HCI Track</h4>
        <CoursesContainer courses={selectedCourses["hci"]} />
      </div>
      <div className="pl-10 pt-10">
        <h4 className="mb-2"># Media & Contents Track</h4>
        <CoursesContainer courses={selectedCourses["mediaContents"]} />
      </div>
      <div className="pl-10 pt-10">
        <h4 className="mb-2"># Technology Track</h4>
        <CoursesContainer courses={selectedCourses["technology"]} />
      </div>
      <div className="px-10 py-10">
        <h4 className="mb-2"># Project</h4>
        <CoursesContainer courses={selectedCourses["project"]} />
      </div>
    </>
  );
}

// Main page component with Suspense
export default function Archiving() {
  return (
    <Layout>
      <Suspense fallback={<h2>LOADING...</h2>}>
        <ArchivingContent />
      </Suspense>
    </Layout>
  );
}
