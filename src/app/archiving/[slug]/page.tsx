/* 
archiving/[slug]/page.tsx:
    A page for each course in /archiving
*/

import Layout from "@/components/Layout/Layout";
import SemesterSelect from "@/components/SemesterSelect/SemesterSelect";

export default function ArchivingCourse({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <Layout>
      {/* h1: COURSE */}
      <h1>C0URSE</h1>
      {/* SemesterSelect: dropdown select box */}
      <div className="border-t-2 border-solid border-black">
        <SemesterSelect />
      </div>
    </Layout>
  );
}
