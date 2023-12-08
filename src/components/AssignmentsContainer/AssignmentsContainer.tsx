/* 
AssignmentsContainer.tsx:
    A container that contains AssignmentButton
*/

import { AssignmentType } from "@/api/assignments";
import { Asap_Condensed } from "next/font/google";
import Image from "next/image";

function AssignmentButton({ assignment }: { assignment: AssignmentType }) {
  return (
    <div className="w-2">
      <Image
        src={assignment.thumbnail}
        alt="thumbnail"
        width={10000}
        height={10000}
      />
    </div>
  );
}

export default function AssignmentsContainer({
  assignments,
}: {
  assignments: AssignmentType[];
}) {
  return assignments.map((assignment) => (
    <AssignmentButton assignment={assignment} key={assignment.id} />
  ));
}
