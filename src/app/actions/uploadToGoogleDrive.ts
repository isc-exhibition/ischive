"use server";

import { google } from "googleapis";
import { Readable } from "stream";

// 지정한 Google Drive 폴더에 썸네일 및 과제물을 수합하고, 성공 시 해당 과제로 가는 link를 return합니다.
export async function uploadToGoogleDrive(
  formData: FormData,
  fileType: string,
) {
  // google service account를 통해 생성한 json credentials를 설정합니다.
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(
      process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || "{}",
    ),
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  });

  const drive = google.drive({ version: "v3", auth });

  // 중요: 과제 수합을 받을 FOLDER_ID를 설정해 줍니다.
  const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;
  const file =
    fileType === "thumbnail"
      ? (formData.get("thumbnail") as File | null)
      : (formData.get("assignmentFile") as File | null);

  if (!file) {
    throw new Error("No file uploaded.");
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    const fileMetadata: { name: string; parents?: string[] } = {
      name: file.name,
      parents: FOLDER_ID ? [FOLDER_ID] : undefined,
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: {
        mimeType: file.type,
        body: stream,
      },
      fields: "id, webViewLink, webContentLink",
    });

    return {
      success: true,
      link: response.data.webViewLink,
    };
  } catch (error) {
    console.error("Error uploading to Google Drive:", error);
    throw new Error("failed to upload file");
  }
}
