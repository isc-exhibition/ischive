/* 
assignment/[assignmentId]/ArchivingAssignment.tsx:
  A client-side page for each assignment in /archiving/[courseId]
*/

"use client";

import Layout from "@/components/Layout/Layout";
import { AssignmentInfoType, fetchAssignmentInfo } from "@/api/fetch";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ArchivingAssignment({
  params,
}: {
  params: { assignmentId: string };
}) {
  // router const
  const router = useRouter();

  // extract assignmentId from slug
  const assignmentId = params.assignmentId;

  // an assignmentInfo that will be fetched from Google Sheet
  const [assignmentInfo, setAssignmentInfo] = useState<AssignmentInfoType>({
    semester: "",
    courseName: "",
    assignmentName: "",
    description: "",
    members: "",
    roles: "",
    igAccounts: "",
    assignmentLink: "",
    emails: "",
    id: "id",
  });

  // members, igAcounts, and emails
  const [members, setMembers] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [igAccounts, setIgAccounts] = useState<string[]>([]);
  const [emails, setEmails] = useState<string[]>([]);

  // fetch assignmentInfo by using fetchAssignmentInfo function
  useEffect(() => {
    const fetchData = async () => {
      const fetchedAssignmentInfo = await fetchAssignmentInfo(assignmentId);
      setAssignmentInfo(fetchedAssignmentInfo);
    };

    fetchData();
  }, [assignmentId]);

  // set members, igAccounts, and emails when assignmentInfo is fetched
  useEffect(() => {
    setMembers(assignmentInfo.members.split(", "));
    setRoles(assignmentInfo.roles.split(", "));
    setIgAccounts(assignmentInfo.igAccounts.split(", "));
    setEmails(assignmentInfo.emails.split(", "));
  }, [assignmentInfo]);

  return (
    <Layout>
      {assignmentInfo.id === "id" ? (
        /* h2: LOADING */
        <h2>LOADING...</h2>
      ) : (
        <div>
          {/* STUDENT WORKS and semester with courseName */}
          <div className="flex flex-row items-center justify-between">
            {/* h1: STUDENT WORKS */}
            <h1 className="text-5xl md:text-7xl">STUDENT W0RKS</h1>
            {/* div: semester and courseName */}
            <div className="text-Pretendard invisible mr-3 flex flex-col items-end font-bold text-[#FF5C00] md:visible">
              <p>{assignmentInfo.semester}</p>
              <p>{assignmentInfo.courseName}</p>
            </div>
          </div>

          {/* h2: assignment name */}
          <div className="border-y-2 border-solid border-black">
            <h2 className="text-lg md:text-xl lg:text-3xl">
              {assignmentInfo.assignmentName}
            </h2>
          </div>

          {/* div: members and back button*/}
          <div className="flex flex-row items-center justify-between border-b-2 border-solid border-black">
            <p className="mx-4 my-1 font-Pretendard text-base md:text-lg">
              {assignmentInfo.members}
            </p>
            <Image
              src={"/assets/img/back_orange.png"}
              alt="back-orange"
              width={0}
              height={0}
              sizes="20vw"
              className="w-9 cursor-pointer md:w-10"
              onClick={() => router.back()}
            />
          </div>

          {/* div: container for embedLink, description, and profiles of members */}
          <div className="flex flex-col items-center px-[10%] py-[5%]">
            {/* div: embedLink, Google Drive link to embed */}
            {assignmentInfo.embedLink === "" ? null : (
              <div className="relative mb-8 w-[100%] px-0 pb-[45%]">
                <iframe
                  src={assignmentInfo.embedLink}
                  className="absolute left-0 top-0 h-full w-full"
                ></iframe>
              </div>
            )}
            {/* div: assignmentLink, a link button to external website */}
            {assignmentInfo.assignmentLink === "" ? null : (
              <Link
                href={assignmentInfo.assignmentLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="relative h-12 overflow-hidden border border-[#FF5C00] text-[#FF5C00] transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#FF5C00] before:duration-300 before:ease-out hover:text-white hover:before:h-40 hover:before:w-[100%] hover:before:opacity-80">
                  <span className="relative z-10 p-5 font-MonoplexWideNerd font-semibold md:text-lg">
                    웹페이지 바로가기
                  </span>
                </button>
              </Link>
            )}
            {/* div: description */}
            <div className="my-8">
              <p className="font-Pretendard md:text-lg">
                {assignmentInfo.description}
              </p>
            </div>
            {/* div: profiles */}
            <div className="mt-8 grid w-full grid-cols-2 items-start justify-items-start font-Pretendard text-sm md:text-lg">
              {members.map((member, index) => (
                <div className="mb-8 flex flex-col items-start" key={index}>
                  {/* name and role */}
                  <div className="flex flex-row">
                    <span className="font-bold text-[#FF5C00]">{member}</span>
                    <span className="text-[#FF5C00]">
                      &nbsp;| {roles[index] ? roles[index] : null}
                    </span>
                  </div>
                  {/* instagram account */}
                  {!igAccounts[index] || igAccounts[index].length < 4 ? null : (
                    <div className="flex flex-row items-center">
                      <Link
                        href={`https://www.instagram.com/${igAccounts[
                          index
                        ].slice(1)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src="/assets/img/instagram.png"
                          alt="ig-logo"
                          width={0}
                          height={0}
                          sizes="20vw"
                          className="mr-1 h-4 w-4"
                        />
                      </Link>
                      <p>{igAccounts[index]}</p>
                    </div>
                  )}
                  {/* email */}
                  <div>{emails[index] ? emails[index] : null}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
