/* 
archiving/page.tsx:
  Describes /archiving
  Shows all tracks and courses
*/

import Image from "next/image";
import Layout from "@/components/Layout/Layout";
import SemesterSelect from "@/components/SemesterSelect/SemesterSelect";

export default async function Page() {
  return (
    <Layout>
      {/* h1: ROADMAP */}
      <h1>ROADMAP</h1>
      {/* SemesterSelect: dropdown select box */}
      <div className="border-t-2 border-solid border-black">
        <SemesterSelect></SemesterSelect>
      </div>
      {/* div: container for tracks and courses */}
      <div className="border-t-2 border-solid border-black"></div>
    </Layout>
  );
}
