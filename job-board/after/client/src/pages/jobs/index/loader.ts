import { getAllPublishedListings } from "@/features/job-listing"
import { deferredLoader } from "@/lib/reactRouter"

export const loader = deferredLoader(() => {
  return { jobListingsPromise: getAllPublishedListings() }
})
