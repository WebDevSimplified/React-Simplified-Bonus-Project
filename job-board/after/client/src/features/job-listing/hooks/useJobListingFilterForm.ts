import {
  JOB_LISTING_EXPERIENCE_LEVELS,
  JOB_LISTING_TYPES,
} from "@backend/constants/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { JobListing } from "../constants/types"

const jobListingFilterSchema = z.object({
  title: z.string(),
  location: z.string(),
  minimumSalary: z.number().or(z.nan()),
  type: z.enum(JOB_LISTING_TYPES).or(z.literal("")),
  experienceLevel: z.enum(JOB_LISTING_EXPERIENCE_LEVELS).or(z.literal("")),
  showHidden: z.boolean(),
  onlyShowFavorites: z.boolean(),
})

export type JobListingFormValues = z.infer<typeof jobListingFilterSchema>

export function useJobListingFilterForm() {
  const form = useForm<JobListingFormValues>({
    resolver: zodResolver(jobListingFilterSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      experienceLevel: "",
      location: "",
      minimumSalary: 0,
      onlyShowFavorites: false,
      showHidden: false,
      type: "",
    },
  })

  const values = form.watch()

  function getFilteredJobs(
    jobListings: JobListing[],
    hiddenIds: string[],
    favoriteIds: string[]
  ) {
    return jobListings.filter(jobListing => {
      if (!jobListing.title.toLowerCase().match(values.title.toLowerCase())) {
        return false
      }

      if (
        !jobListing.location.toLowerCase().match(values.location.toLowerCase())
      ) {
        return false
      }

      if (
        !isNaN(values.minimumSalary) &&
        jobListing.salary < values.minimumSalary
      ) {
        return false
      }

      if (values.type !== "" && jobListing.type !== values.type) {
        return false
      }

      if (
        values.experienceLevel !== "" &&
        jobListing.experienceLevel !== values.experienceLevel
      ) {
        return false
      }

      if (!values.showHidden && hiddenIds.includes(jobListing.id)) {
        return false
      }

      if (values.onlyShowFavorites && !favoriteIds.includes(jobListing.id)) {
        return false
      }

      return true
    })
  }

  return { form, getFilteredJobs }
}
