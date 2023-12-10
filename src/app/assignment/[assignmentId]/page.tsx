"use client";

import { redirect, useSearchParams } from "next/navigation";
import Layout from "@/components/Layout/Layout";
import { AssignmentType } from "@/api/assignments";

export default function ArchivingAssignment({
  params,
}: {
  params: { assignmentId: string };
}) {
  // useSearchParams to get query
  const searchParams = useSearchParams();

  if (!searchParams.has("assignment")) {
    redirect("/archiving");
  }

  const assignment: AssignmentType = JSON.parse(
    searchParams.get("assignment")!,
  );

  return (
    <Layout>
      <h1>STUDENT W0RK</h1>
      <h2>{assignment.assignmentName}</h2>
      <p>{assignment.members}</p>
    </Layout>
  );
}
