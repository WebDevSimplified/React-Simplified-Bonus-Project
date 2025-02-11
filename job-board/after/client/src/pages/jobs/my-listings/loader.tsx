import { getAllMyListings } from "@/features/job-listing"

export function loader() {
  return { jobListingsPromise: getAllMyListings() }
}
