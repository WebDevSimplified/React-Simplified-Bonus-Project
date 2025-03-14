import { getJobListing } from "@/features/job-listing"
import { LoaderFunctionArgs } from "react-router"

export function loader({ params: { id } }: LoaderFunctionArgs) {
  if (typeof id !== "string") throw new Response("Not Found", { status: 404 })

  return { jobListingPromise: getJobListing(id), id }
}
