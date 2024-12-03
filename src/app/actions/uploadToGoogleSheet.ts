"use server";

import { google } from "googleapis";

export async function uploadToGoogleSheet(formData: FormData) {
  // google service account를 통해 생성한 json credentials를 설정합니다.
  // 이는 GET 요청은 기존처럼 API KEY로만 가능한 반면, POST 요청은 auth를 반드시 설정해야 하기 때문입니다.
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(
      process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || "{}",
    ),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  // 폼 제출을 받을 sheet id를 지정합니다.
  const SPREADSHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
  // 폼 제출을 받을 탭 이름과 셀 범위를 지정합니다.
  const RANGE = "FormSubmittedAssignments(test)!A:N";

  // 멤버 데이터를 구글 시트에 알맞은 양식으로 정리합니다.
  const members: Array<{
    name: string;
    role: string;
    instagram: string;
    email: string;
  }> = [];
  formData.forEach((value, key) => {
    const memberMatch = key.match(
      /^members\[(\d+)\]\[(name|role|instagram|email)\]$/,
    );
    if (memberMatch) {
      const [_, index, field] = memberMatch;
      const memberIndex = parseInt(index, 10);
      members[memberIndex] = {
        ...members[memberIndex],
        [field]: value as string,
      };
    }
  });

  const names = members.map((member) => member.name).join(",");
  const roles = members.map((member) => member.role).join(",");
  const instagrams = members.map((member) => member.instagram || "").join(",");
  const emails = members.map((member) => member.email).join(",");
  formData.set("memberNames", names);
  formData.set("memberRoles", roles);
  formData.set("memberInstagrams", instagrams);
  formData.set("memberEmails", emails);

  // Array 형태의 devices만 parse 하는 작업
  const devices = formData.getAll("devices");
  if (devices && devices.length > 0) {
    formData.set("devices", devices.join(","));
  }

  console.log(formData);
  console.log(formData.get("devices"));

  const formValues = [
    [
      formData.get("submittedAt"),
      formData.get("semester"),
      formData.get("subject"),
      formData.get("name"),
      formData.get("description"),
      formData.get("thumbnailLink"),
      formData.get("assignmentFileLink"),
      formData.get("memberNames"),
      formData.get("memberRoles"),
      formData.get("memberInstagrams"),
      formData.get("memberEmails"),
      formData.get("assignmentLink"),
      formData.get("devices"), // 아카이빙에는 필요없지만 과제전을 위해 추가
    ],
  ];

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: "RAW",
      requestBody: {
        values: formValues,
      },
    });

    return { success: true };
  } catch (error) {
    throw new Error("Failed to upload data to Google Sheet.");
  }
}
