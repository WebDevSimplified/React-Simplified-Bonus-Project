import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import { Await, useDeferredLoaderData } from "@/lib/reactRouter"
import { Suspense } from "react"
import { Link } from "react-router-dom"
import { loader } from "./loader"
import {
  JobListingFullDialog,
  JobListingFilterForm,
  JobListingGrid,
  JobListingCard,
  JobListingSkeletonGrid,
  useJobListingFilterForm,
} from "@/features/job-listing"
import { Eye, EyeOff, Heart } from "lucide-react"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { cn } from "@/utils/shadcnUtils"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export function JobListingsListPage() {
  const { jobListingsPromise } = useDeferredLoaderData<typeof loader>()
  const [hiddenJobListingIds, setHiddenJobListingIds] = useLocalStorage<
    string[]
  >("hiddenJobsIds", [])
  const [favoriteJobListingIds, setFavoriteJobListingIds] = useLocalStorage<
    string[]
  >("favoriteJobsIds", [])
  const { form, getFilteredJobs } = useJobListingFilterForm()

  function toggleFavorite(jobListingId: string) {
    setFavoriteJobListingIds(ids => {
      if (ids.includes(jobListingId)) {
        return ids.filter(id => id !== jobListingId)
      }

      return [...ids, jobListingId]
    })
  }

  function toggleHide(jobListingId: string, title: string) {
    setHiddenJobListingIds(ids => {
      if (ids.includes(jobListingId)) {
        return ids.filter(id => id !== jobListingId)
      }

      return [...ids, jobListingId]
    })

    if (hiddenJobListingIds.includes(jobListingId)) return

    toast({
      title: "Job Hidden",
      description: `${title} will no longer be shown`,
      action: (
        <ToastAction
          onClick={() => {
            setHiddenJobListingIds(ids => ids.filter(id => id !== jobListingId))
          }}
          altText="Click show hidden in the filter section to show hidden jobs and then click the show button in the card to show this job again"
        >
          Undo
        </ToastAction>
      ),
    })
  }

  return (
    <>
      <PageHeader
        btnSection={
          <Button variant="outline" asChild>
            <Link to="/jobs/new">Create Listing</Link>
          </Button>
        }
      >
        Job Listings
      </PageHeader>
      <JobListingFilterForm className="mb-12" form={form} />
      <Suspense fallback={<JobListingSkeletonGrid />}>
        <Await resolve={jobListingsPromise}>
          {jobListings => (
            <JobListingGrid>
              {getFilteredJobs(
                jobListings,
                hiddenJobListingIds,
                favoriteJobListingIds
              ).map(jobListing => {
                const isFavorite = favoriteJobListingIds.includes(jobListing.id)
                const isHidden = hiddenJobListingIds.includes(jobListing.id)
                const HideIcon = isHidden ? Eye : EyeOff

                return (
                  <JobListingCard
                    key={jobListing.id}
                    className={isHidden ? "opacity-50" : undefined}
                    {...jobListing}
                    footerBtns={<JobListingFullDialog {...jobListing} />}
                    headerDetails={
                      <div className="-mr-3 -mt-3">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="rounded-full"
                          onClick={() =>
                            toggleHide(jobListing.id, jobListing.title)
                          }
                        >
                          <HideIcon className="w-4 h-4" />
                          <div className="sr-only">
                            {isHidden ? "Show" : "Hide"}
                          </div>
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="rounded-full"
                          onClick={() => toggleFavorite(jobListing.id)}
                        >
                          <Heart
                            className={cn(
                              "w-4 h-4",
                              isFavorite && "fill-red-500 stroke-red-500"
                            )}
                          />
                          <div className="sr-only">
                            {isFavorite ? "Un-Favorite" : "Favorite"}
                          </div>
                        </Button>
                      </div>
                    }
                  />
                )
              })}
            </JobListingGrid>
          )}
        </Await>
      </Suspense>
    </>
  )
}
