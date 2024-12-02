"use server";

import { google } from "googleapis";

export async function uploadToGoogleSheet(formData: FormData) {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(
      process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || "{}",
    ),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  //   const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const SPREADSHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
  // 폼 제출을 받을 탭 이름과 셀 범위를 지정합니다.
  const RANGE = "FormSubmittedAssignments(test)!A:N";

  const formValues = [
    [formData.get("name"), formData.get("email"), formData.get("message")],
  ];

  //   console.log(values);
  console.log(formValues);
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: "RAW",
      requestBody: {
        values: formValues,
      },
    });

    console.log("Successfully appended to Google Sheet:", response.data);
    return { success: true };
  } catch (error) {
    console.error("Error appending to Google Sheet:", error);
    throw new Error("Failed to upload data to Google Sheet.");
  }
}
