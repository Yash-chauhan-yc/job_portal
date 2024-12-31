"use server";
import { jobFilterScheme } from "./validation";

export async function filterJobs(formData: FormData) {
  "use server";
  
  const values = Object.fromEntries(formData.entries());
  console.log("Form values:", values);

  const parseResult = jobFilterScheme.safeParse(values);
  if (!parseResult.success) {
    console.log("Validation error:", parseResult.error);
    return null;  // Return null on validation failure
  }

  const { q, type, location, remote } = parseResult.data;

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  console.log(`Generated query string: ${searchParams.toString()}`);

  return `/?${searchParams.toString()}`;  // Return the URL
}
