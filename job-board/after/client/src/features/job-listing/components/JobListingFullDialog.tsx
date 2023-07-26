import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { formatCurrency } from "@/utils/formatters"
import {
  Banknote,
  CalendarDays,
  ExternalLink,
  GraduationCap,
} from "lucide-react"
import { JobListing } from "../constants/types"

type JobListingFullDialogProps = Pick<
  JobListing,
  | "applyUrl"
  | "companyName"
  | "description"
  | "experienceLevel"
  | "location"
  | "salary"
  | "type"
  | "title"
>

export function JobListingFullDialog({
  title,
  companyName,
  location,
  salary,
  type: jobType,
  experienceLevel,
  applyUrl,
  description,
}: JobListingFullDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View More</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-2rem)] flex flex-col max-w-3xl w-[calc(100vw-2rem)]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="flex flex-col">
            <div>{companyName}</div>
            <div>{location}</div>
          </DialogDescription>
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
        </DialogHeader>
        <div>
          <Button asChild>
            <a href={applyUrl} target="_blank">
              Apply On Company Site
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
        <MarkdownRenderer className="overflow-y-auto pr-6">
          {description}
        </MarkdownRenderer>
      </DialogContent>
    </Dialog>
  )
}
