import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobResults from "@/components/JobResults";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}

export function getTitle({ q, type, location, remote }: JobFilterValues) {
  const titlePrefix = q
    ? `${q} Jobs`
    : type
      ? `${type} Developer Jobs`
      : remote
        ? "Remote Devloper Jobs"
        : "All Developer Jobs";

  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}

export function generateMetadata({
  searchParams: { q, type, location, remote },
}: PageProps): Metadata {
  return {
    title: `${getTitle({ q, type, location, remote: remote === "true" })} | Find Jobs`,
  };
}

export default async function Home({ searchParams }: PageProps) {
  const { q, type, location, remote } = await searchParams;

  const filterValue: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  };

  return (
    <main className="max-w-5xl m-auto px-3 my-10 space-y-10">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {getTitle(filterValue)}
        </h1>
        <p className="text-lg text-muted-foreground">
          Find your next job in tech
        </p>
      </div>
      <section className="flex flex-col md:flex-row gap-4">
        <JobFilterSidebar defaultValues={filterValue} />
        <JobResults filterValues={filterValue} />
      </section>
    </main>
  );
}
