"use client";

import { useState } from "react";
import { uploadToGoogleSheet } from "../actions/uploadToGoogleSheet";

// next.js server action을 import 하여 form page에서 POST action을 처리합니다.
export default function FormPage() {
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const response = await uploadToGoogleSheet(formData);
      if (response?.success) {
        setStatus("success");
      } else {
        setStatus("fail");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error occurred!");
    }
  };

  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <label className="mb-2 block">
          Name:
          <input name="name" className="w-full rounded border p-2" required />
        </label>
        <label className="mb-2 block">
          Email:
          <input
            name="email"
            type="email"
            className="w-full rounded border p-2"
            required
          />
        </label>
        <label className="mb-4 block">
          Message:
          <textarea
            name="message"
            className="w-full rounded border p-2"
            required
          />
        </label>
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Submit
        </button>
      </form>
      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}
