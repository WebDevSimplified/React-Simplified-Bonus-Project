import { getAllPublishedListings } from "@/features/job-listing"

export function loader() {
  return { jobListingsPromise: getAllPublishedListings() }
}
