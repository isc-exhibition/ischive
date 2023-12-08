/* 
AssignmentsContainer.tsx:
    A container that contains AssignmentButton
*/

import { AssignmentType } from "@/api/assignments";
import Image from "next/image";

function AssignmentButton({ assignment }: { assignment: AssignmentType }) {
  return (
    <div className="m-4 h-48 w-48">
      <Image
        src={assignment.thumbnail}
        alt={`thumb-${assignment.id}`}
        width={10000}
        height={10000}
        unoptimized={true}
        className="object-contain"
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
