// /* eslint-disable @typescript-eslint/no-unused-vars */
// import prisma from "@/lib/prisma";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { jobTypes } from "@/lib/job-types";
// import { Button } from "./ui/button";
// import Select from "./ui/select";
// import { jobFilterScheme } from "@/lib/validation";
// import { redirect } from "next/navigation";

// async function filterJobs(formData: FormData) {
//   "use server";
//   // console.log(formData.get("type"));
//   // console.log("00000000000000000000",formData);

//   // const values = Object.fromEntries(formData.entries());
//   // console.log(values);

//   // const parseResult = jobFilterScheme.safeParse(values);
//   // const { q, type, location, remote } = jobFilterScheme.parse(values);

//   // const searchParams = new URLSearchParams({
//   //   ...(q && { q: q.trim() }),
//   //   ...(type && { type }),
//   //   ...(location && { location }),
//   //   ...(remote && { remote: "true" }),
//   // });

//   // redirect(`/?${searchParams.toString()}`);
//   redirect(`/?${formData.get("q")}`);
// }

// export default async function JobFilterSidebar() {
//   const distinctLocations = (await prisma.job
//     .findMany({
//       where: {
//         approved: true,
//       },
//       select: { location: true },
//       distinct: ["location"],
//     })
//     .then((locations) =>
//       locations.map(({ location }) => location).filter(Boolean),
//     )) as string[];

//   return (
//     <aside className="md:w-[260px] sticky top-0 h-fit bg-background border p-4 rounded-lg">
//       <form action={filterJobs}>
//         {/* <div className="space-y-4">
//           <div className="flex flex-col gap-2">
//             <Label htmlFor="q">Search</Label>
//             <Input id="q" name="q" placeholder="Title, company, etc." />
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label htmlFor="type">Type</Label>
//             <Select id="type" name="type" defaultValue="">
//               <option value="">All Types</option>
//               {jobTypes.map((type) => (
//                 <option key={type} value={type}>
//                   {type}
//                 </option>
//               ))}
//             </Select>
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label htmlFor="location">Location</Label>
//             <Select id="location" name="location" defaultValue="">
//               <option value="">All Locations</option>
//               {distinctLocations.map((location) => (
//                 <option key={location} value={location}>
//                   {location}
//                 </option>
//               ))}
//             </Select>
//           </div>
//           <div className="flex items-center gap-2">
//             <input
//               id="remote"
//               name="remote"
//               type="checkbox"
//               className="scale-125 accent-black"
//             />
//             <Label htmlFor="remote">Remote Jobs</Label>
//           </div>
//           <Button type="submit" className="w-full">
//             Filter Jobs
//           </Button>
//         </div> */}
//         <Label htmlFor="q">Search</Label>
//         <Input id="q" name="q" placeholder="Title, company, etc." />
//         <Button type="submit" className="w-full">
//           Filter Jobs
//         </Button>
//       </form>
//     </aside>
//   );
// }

// "use client";

// import { useState, FormEvent } from "react";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import { Button } from "./ui/button";
// import { useRouter } from "next/navigation";
// import { filterJobs } from "@/lib/action";
// import Select from "./ui/select";
// import { jobTypes } from "@/lib/job-types";

// export default function JobFilterSidebar() {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   async function handleSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);

//     setLoading(true);

//     console.log('Form submission started');

//     const newUrl = await filterJobs(formData);
//     if (newUrl) {
//       router.push(newUrl);
//     }

//     setLoading(false);
//     console.log('Form submission complete');
//   }

//   console.log(loading)

//   return (
//     <aside className="md:w-[260px] sticky top-0 h-fit bg-background border p-4 rounded-lg">
//       <form onSubmit={handleSubmit}>
//         <div className="space-y-4">
//           <div className="flex flex-col gap-2">
//             <Label htmlFor="q">Search</Label>
//             <Input id="q" name="q" placeholder="Title, company, etc." />
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label htmlFor="type">Type</Label>
//             <Select id="type" name="type" defaultValue="">
//               <option value="">All Types</option>
//               {jobTypes.map((type) => (
//                 <option key={type} value={type}>
//                   {type}
//                 </option>
//               ))}
//             </Select>
//           </div>
//           {/* <div className="flex flex-col gap-2">
//             <Label htmlFor="location">Location</Label>
//             <Select id="location" name="location" defaultValue="">
//               <option value="">All Locations</option>
//               {distinctLocations.map((location) => (
//                 <option key={location} value={location}>
//                   {location}
//                 </option>
//               ))}
//             </Select>
//           </div> */}
//           <div className="flex items-center gap-2">
//             <input
//               id="remote"
//               name="remote"
//               type="checkbox"
//               className="scale-125 accent-black"
//             />
//             <Label htmlFor="remote">Remote Jobs</Label>
//           </div>
//           <Button type="submit" className="w-full" disabled={loading}>
//             {loading ? "Filtering..." : "Filter Jobs"}
//           </Button>
//         </div>
//       </form>
//     </aside>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
// import { useRouter } from "next/navigation";
// import { filterJobs } from "@/lib/action";
import Select from "./ui/select";
import { jobTypes } from "@/lib/job-types";
import { filterJobs } from "@/lib/action";
import { JobFilterValues } from "@/lib/validation";

interface jobFilterSidebarProps {
  defaultValues : JobFilterValues
}

export default function JobFilterSidebar({defaultValues}:jobFilterSidebarProps) {
  const [locations, setLocations] = useState<string[]>([]);
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/locations");
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);
  return (
    <aside className="md:w-[260px] sticky top-0 h-fit bg-background border p-4 rounded-lg">
      <form
        onSubmit={(event) => {
          filterJobs(new FormData(event.currentTarget));
        }}
        key={JSON.stringify(defaultValues)}
      >
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input id="q" name="q" placeholder="Title, company, etc." defaultValue={defaultValues.q} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select id="type" name="type" defaultValue={defaultValues.type}>
              <option value="">All Types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location" defaultValue={defaultValues.location}>
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-black"
              defaultChecked={defaultValues.remote}
            />
            <Label htmlFor="remote">Remote Jobs</Label>
          </div>
          <Button type="submit" className="w-full">
            {/* {loading ? "Filtering..." : "Filter Jobs"} */}Filter Jobs
          </Button>
        </div>
      </form>
    </aside>
  );
}
