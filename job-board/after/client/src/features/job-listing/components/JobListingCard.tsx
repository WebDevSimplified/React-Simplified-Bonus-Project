import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatCurrency } from "@/utils/formatters"
import { cn } from "@/utils/shadcnUtils"
import { Banknote, CalendarDays, GraduationCap } from "lucide-react"
import { ReactNode } from "react"
import { JobListing } from "../constants/types"

type JobListingCardProps = {
  className?: string
  headerDetails?: ReactNode
  footerBtns?: ReactNode
} & Pick<
  JobListing,
  | "title"
  | "companyName"
  | "experienceLevel"
  | "shortDescription"
  | "salary"
  | "location"
  | "type"
>

export function JobListingCard({
  className,
  title,
  companyName,
  location,
  headerDetails,
  salary,
  type: jobType,
  experienceLevel,
  shortDescription,
  footerBtns,
}: JobListingCardProps) {
  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardHeader>
        <div className="flex gap-4 justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="flex flex-col">
              <span>{companyName}</span>
              <span>{location}</span>
            </CardDescription>
          </div>
          {headerDetails}
        </div>
        <div className="flex gap-1 flex-wrap">
          <Badge variant="secondary" className="flex gap-1 whitespace-nowrap">
            <Banknote className="w-4 h-4" /> {formatCurrency(salary)}
          </Badge>
          <Badge variant="secondary" className="flex gap-1 whitespace-nowrap">
            <CalendarDays className="w-4 h-4" /> {jobType}
          </Badge>
          <Badge variant="secondary" className="flex gap-1 whitespace-nowrap">
            <GraduationCap className="w-4 h-4" /> {experienceLevel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">{shortDescription}</CardContent>
      <CardFooter className="flex gap-2 items-stretch justify-end">
        {footerBtns}
      </CardFooter>
    </Card>
  )
}
