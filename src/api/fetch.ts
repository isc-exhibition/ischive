/* 
assignments.ts:
    An api that fetches course and assignment infos from Google Sheets
*/

import { courses } from "./courses";

// CourseInfoType: a type for courseInfo
export type CourseInfoType = {
  [index: string]: any;
  courseId: number;
  track: string;
  name: string;
  professors: any; // an object (semester: professorName)
};

// AssignmentType: a type for assignment
export type AssignmentType = {
  [index: string]: any;
  year: number;
  semester: number;
  courseId: number;
  courseName: string;
  assignmentName: string;
  members: string;
  thumbnail: string;
  id: string;
};

// AssignmentInfoType: a type for assignmentInfo
export type AssignmentInfoType = {
  [index: string]: any;
  semester: string;
  courseName: string;
  assignmentName: string;
  description: string;
  embedLink?: string;
  members: string;
  roles: string;
  igAccounts: string;
  emails: string;
  assignmentLink: string;
  id: string;
};

// all semesters in Google Sheet
const semesters = Object.keys(courses).slice(1).reverse();

// fetchCourseInfo: fetch courseInfo by courseId
export async function fetchCourseInfo(courseId: number) {
  // Sheet 'CourseInfoSheet' is holding infos about courses
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${
      process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID
    }/values/CourseInfoSheet!${courseId + 1}:${courseId + 1}?key=${
      process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    }`,
    {
      next: {
        revalidate: 60,
      },
    },
  );
  const json = await response.json();
  const values = await json.values[0];

  // map key: semester and value: name of the corresponding professor
  const professors: any = {};
  const professorNames = values.slice(3);
  for (let i = 0; i < semesters.length; i++) {
    if (i >= professorNames.length) {
      professors[semesters[i]] = "";
    } else {
      professors[semesters[i]] = professorNames[i];
    }
  }

  const courseInfo: CourseInfoType = {
    courseId: values[0],
    track: values[1],
    name: values[2],
    professors: professors,
  };

  return courseInfo;
}

// fetchAssignments: fetch assignments by name
export async function fetchAssignments(courseId: number, courseName: string) {
  // Sheet 'AssignmentsSheet' is holding infos about assignments
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID}/values/AssignmentsSheet?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
    {
      next: {
        revalidate: 60,
      },
    },
  );
  const json = await response.json();
  const values = await json.values;

  let assignments: AssignmentType[] = [];

  // Save assignments of the course into assignments
  values.forEach((value: any) => {
    if (value[2] === courseName) {
      const thumbnail = value[5].split("=")[1]
        ? `https://drive.usercontent.google.com/download?id=${
            value[5].split("=")[1]
          }`
        : "/assets/img/thumbnail_placeholder.png";
      const assignment: AssignmentType = {
        year: parseInt(value[1].slice(0, 4)),
        semester: parseInt(value[1][8]),
        courseId: courseId,
        courseName: courseName,
        assignmentName: value[3],
        members: value[7],
        thumbnail: thumbnail,
        // thumbnail: `https://drive.google.com/file/d/${
        //   value[5].split("=")[1]
        // }/preview`,
        id: value[13],
      };
      assignments.push(assignment);
    }
  });

  return assignments;
}

// fetchAssignmentInfo: fetch assignmentInfo by assignmentId
export async function fetchAssignmentInfo(assignmentId: string) {
  // Sheet 'AssignmentsSheet' is holding infos about assignments
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID}/values/AssignmentsSheet?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
  );
  const json = await response.json();
  const values = await json.values;

  // filter values by assignmentId
  const selectedAssignment: string[] = values.filter(
    (value: any) => value[13] === assignmentId,
  );

  // initialize assignmentInfo by selectedAssignment
  let assignmentInfo: AssignmentInfoType = {
    semester: selectedAssignment[0][1],
    courseName: selectedAssignment[0][2],
    assignmentName: selectedAssignment[0][3],
    description: selectedAssignment[0][4],
    embedLink: `https://drive.google.com/file/d/${
      selectedAssignment[0][5 + 1].split("=")[1]
    }/preview`,
    members: selectedAssignment[0][6 + 1],
    roles: selectedAssignment[0][7 + 1],
    igAccounts: selectedAssignment[0][8 + 1],
    emails: selectedAssignment[0][9 + 1],
    assignmentLink: selectedAssignment[0][10 + 1],
    id: selectedAssignment[0][13],
  };

  return assignmentInfo;
}
