import { loader } from "./loader"
import { PageHeader } from "@/components/ui/PageHeader"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Await, Link, useLoaderData } from "react-router"

export function OrderCompletePage() {
  const { messagePromise } = useLoaderData<typeof loader>()

  return (
    <div className="flex flex-col items-center">
      <PageHeader
        subtitle={
          <Suspense fallback="Your payment is processing">
            <Await resolve={messagePromise}>{message => message}</Await>
          </Suspense>
        }
      >
        Order Complete
      </PageHeader>
      <Button asChild>
        <Link to="/jobs/my-listings">View Your Job Listings</Link>
      </Button>
    </div>
  )
}
