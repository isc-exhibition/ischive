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

  const formValues = [
    [formData.get("name"), formData.get("email"), formData.get("message")],
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
